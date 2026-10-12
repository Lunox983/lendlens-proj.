/**
 * Script to fix missing equipment images
 * 
 * Problem: Some equipment_img values in the database point to files (eq-XXXX.jpg)
 * that don't exist on the server. This script maps those missing images to
 * existing image files based on equipment type, and updates the database.
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, 'uploads', 'equipments');

// Manual mapping verified by viewing each image:
// equipment_id -> existing image filename in uploads/equipments/
const IMAGE_MAPPING = {
    3:  'kit04.jpg',           // iPod classic → kit04.jpg (iPod image)
    9:  'ipad.jpg',            // iPad 2 → ipad.jpg
    10: 'AV.jpg',              // Lightning to digital AV adapter → AV.jpg
    11: 'acer.jpg',            // Acer projector → acer.jpg
    16: 'ReadImage.jpg',       // Light-weight headphones (Synchro) → ReadImage.jpg (Panasonic headphones)
    17: 'lightning_1.jpg',     // สายชาร์จโทรศัพท์ (Lightning) → lightning_1.jpg
    18: 'lightning_2.jpg',     // สายชาร์จโทรศัพท์ (Lightning) → lightning_2.jpg
    21: 'USB-C.jpg',           // สายชาร์จโทรศัพท์ (Type C) → USB-C.jpg (USB-C adapter)
    22: 'lightning_3.jpg',     // สายชาร์จโทรศัพท์ (Lightning) → lightning_3.jpg
    23: 'headphones_2.jpg',    // หูฟัง Hyperx cloud stinger 2 core → headphones_2.jpg (HyperX)
    24: 'calculator.jpg',      // เครื่องคิดเลข CASIO fx-350MS → calculator.jpg
    25: 'USB_TYPEC.jpg',       // ปลั๊กไฟ USB + Type C → USB_TYPEC.jpg (Toshino power strip)
    26: 'pen.jpg',             // Stylus pen → pen.jpg
    27: 'mouse.jpg',           // Wireless mouse → mouse.jpg
    29: 'kit44.jpg',           // สายชาร์จโทรศัพท์ (Lightning) → kit44.jpg (Apple adapter)
    // IDs with no matching image → will be set to NULL:
    // 28: ปลั๊กไฟ (4 ช่อง) — no matching image available
    // 31: Image — generic test entry
    // 34: golden toy — no matching image available
};

async function fixImages() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database_libraries',
        waitForConnections: true,
        connectionLimit: 5,
    });

    try {
        console.log('=== Fix Missing Equipment Images ===\n');

        // Get all equipments with missing eq- images
        const [rows] = await pool.query('SELECT equipment_id, name, equipment_img FROM equipments WHERE equipment_img LIKE "%eq-%"');
        
        console.log(`Found ${rows.length} equipments with broken eq- image paths:\n`);

        let fixed = 0;
        let skipped = 0;
        let cleared = 0;

        for (const row of rows) {
            const id = row.equipment_id;
            const mapping = IMAGE_MAPPING[id];

            if (mapping) {
                const sourcePath = path.join(UPLOADS_DIR, mapping);
                const newImgPath = `uploads/equipments/${mapping}`;

                if (fs.existsSync(sourcePath)) {
                    // Update database to point to the existing file
                    await pool.query('UPDATE equipments SET equipment_img = ? WHERE equipment_id = ?', [newImgPath, id]);
                    console.log(`  ✅ ID ${id} "${row.name}"`);
                    console.log(`     ${row.equipment_img} → ${newImgPath}`);
                    fixed++;
                } else {
                    console.log(`  ⚠️  ID ${id} "${row.name}": Source file not found: ${mapping}`);
                    skipped++;
                }
            } else {
                // No mapping available — clear the broken image path
                await pool.query('UPDATE equipments SET equipment_img = NULL WHERE equipment_id = ?', [id]);
                console.log(`  🗑️  ID ${id} "${row.name}": No matching image → set to NULL`);
                cleared++;
            }
        }

        console.log(`\n=== Summary ===`);
        console.log(`✅ Fixed:   ${fixed}`);
        console.log(`🗑️  Cleared: ${cleared}`);
        console.log(`⚠️  Skipped: ${skipped}`);
        console.log(`📦 Total:   ${rows.length}`);

        // Verify: count remaining broken images
        const [remaining] = await pool.query('SELECT COUNT(*) as cnt FROM equipments WHERE equipment_img LIKE "%eq-%"');
        console.log(`\n🔍 Remaining broken eq- paths: ${remaining[0].cnt}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
    }
}

fixImages();
