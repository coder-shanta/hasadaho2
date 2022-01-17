const express = require('express');
const mysql = require('mysql2');
// const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.set('trust proxy', 1); // trust first proxy
app.use(session({
    key: 'userId',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})); */

app.use(session({
    key: 'userId',
    secret: 'openUp',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:"auto",
        httpOnly: true,
        maxAge: 36000000
    }
}));

/* app.use(session({
    path: '/',
    key: 'userId',
    secret: 'openUp',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // sameSite: true,
        // secure: true,
        domain: 'chitlaup.online',
        httpOnly: false,
        maxAge: 36000000
    }
})); */

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'mySql@015#',
    database: 'union_parishad'
});

// const db = mysql.createPool({
//     user: 'nilaansu_test147',
//     host: 'localhost',
//     password: 's7vlH7G_*CZx',
//     database: 'nilaansu_hasadaho_union'
// });

// Residential Start
// Post Data
app.post('/resident', (req, res) => {
    const holding_no = req.body.holding_no;
    const assign_tax = req.body.assign_tax;
    const payer_name = req.body.payer_name;
    const total_tax = req.body.total_tax;
    const guardian_name = req.body.guardian_name;
    const collected_tax = req.body.collected_tax;
    const word_no = req.body.word_no;
    const areas_tax = req.body.areas_tax;
    const village = req.body.village;
    const mobile_no = req.body.mobile_no;
    const previes_areas_tax = req.body.previes_areas_tax;
    console.log(req.body);
    db.query("INSERT INTO resident_table (holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/resident', (req, res) => {
    db.query("SELECT * FROM resident_table", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/resident/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM resident_table  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Update SMS Data
app.put('/resident/sms/:id', (req, res) => {
    const id = req.params.id;
    const sms = req.body.sms;
    // console.log(sms);

    db.query("UPDATE resident_table SET sms=? WHERE id = ?", [sms, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Update Data
app.put('/resident/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const holding_no = req.body.holding_no;
    const assign_tax = req.body.assign_tax;
    const payer_name = req.body.payer_name;
    const total_tax = req.body.total_tax;
    const guardian_name = req.body.guardian_name;
    const collected_tax = req.body.collected_tax;
    const word_no = req.body.word_no;
    const areas_tax = req.body.areas_tax;
    const village = req.body.village;
    const mobile_no = req.body.mobile_no;
    const previes_areas_tax = req.body.previes_areas_tax;
    db.query("UPDATE resident_table SET holding_no = ?, assign_tax = ?, payer_name=?,total_tax=?,guardian_name=?,collected_tax=?,word_no=? ,areas_tax=?, village=?, mobile_no=?, previes_areas_tax=? WHERE id = ?", [holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/resident/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM resident_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
// Residential End

// Commercial Start
// Post Data
app.post('/commerce', (req, res) => {
    const holding_no = req.body.holding_no;
    const assign_tax = req.body.assign_tax;
    const payer_name = req.body.payer_name;
    const total_tax = req.body.total_tax;
    const guardian_name = req.body.guardian_name;
    const collected_tax = req.body.collected_tax;
    const word_no = req.body.word_no;
    const areas_tax = req.body.areas_tax;
    const village = req.body.village;
    const mobile_no = req.body.mobile_no;
    const previes_areas_tax = req.body.previes_areas_tax;
    console.log(req.body);
    db.query("INSERT INTO commerce_table (holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/commerce', (req, res) => {
    db.query("SELECT * FROM commerce_table", (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/commerce/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM commerce_table  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});


// Update SMS Data
app.put('/commerce/sms/:id', (req, res) => {
    const id = req.params.id;
    const sms = req.body.sms;
    console.log(sms);
    db.query("UPDATE commerce_table SET sms=? WHERE id = ?", [sms, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Data
app.put('/commerce/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const holding_no = req.body.holding_no;
    const assign_tax = req.body.assign_tax;
    const payer_name = req.body.payer_name;
    const total_tax = req.body.total_tax;
    const guardian_name = req.body.guardian_name;
    const collected_tax = req.body.collected_tax;
    const word_no = req.body.word_no;
    const areas_tax = req.body.areas_tax;
    const village = req.body.village;
    const mobile_no = req.body.mobile_no;
    const previes_areas_tax = req.body.previes_areas_tax;
    db.query("UPDATE commerce_table SET holding_no = ?, assign_tax = ?, payer_name=?,total_tax=?,guardian_name=?,collected_tax=?,word_no=? ,areas_tax=?, village=?, mobile_no=?, previes_areas_tax=? WHERE id = ?", [holding_no, assign_tax, payer_name, total_tax, guardian_name, collected_tax, word_no, areas_tax, village, mobile_no, previes_areas_tax, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/commerce/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM commerce_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Commercial End

// Tread License Start
// Post Data
app.post('/tread_license', (req, res) => {
    const license_no = req.body.license_no;
    const institute_address = req.body.institute_address;
    const institute_name = req.body.institute_name;
    const profession_capital = req.body.profession_capital;
    const owner_name = req.body.owner_name;
    const license_fee = req.body.license_fee;
    const guardian_name = req.body.guardian_name;
    const arrears = req.body.arrears;
    const mothers_name = req.body.mothers_name;
    const total = req.body.total;
    const address = req.body.address;
    const in_words = req.body.in_words;
    const business_type = req.body.business_type;
    const mobile_no = req.body.mobile_no;
    console.log(req.body);
    db.query("INSERT INTO tread_license_table (license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/tread_license', (req, res) => {
    db.query("SELECT * FROM tread_license_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/tread_license/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM tread_license_table  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/tread_license/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const license_no = req.body.license_no;
    const institute_address = req.body.institute_address;
    const institute_name = req.body.institute_name;
    const profession_capital = req.body.profession_capital;
    const owner_name = req.body.owner_name;
    const license_fee = req.body.license_fee;
    const guardian_name = req.body.guardian_name;
    const arrears = req.body.arrears;
    const mothers_name = req.body.mothers_name;
    const total = req.body.total;
    const address = req.body.address;
    const in_words = req.body.in_words;
    const business_type = req.body.business_type;
    const mobile_no = req.body.mobile_no;
    db.query("UPDATE tread_license_table SET license_no = ?, institute_address = ?, institute_name = ?, profession_capital = ?, owner_name = ?, license_fee = ?, guardian_name =? , arrears = ?, mothers_name = ?, total = ?, address = ?, in_words = ?, business_type = ?, mobile_no = ? WHERE id = ?", [license_no, institute_address, institute_name, profession_capital, owner_name, license_fee, guardian_name, arrears, mothers_name, total, address, in_words, business_type, mobile_no, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/tread_license/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM tread_license_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Tread License End

// Character Certificate Start
// Post Data
app.post('/character_certificate', (req, res) => {
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    console.log(req.body);
    db.query("INSERT INTO character_certificate (memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/character_certificate', (req, res) => {
    db.query("SELECT * FROM character_certificate", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/character_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM character_certificate  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/character_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    db.query("UPDATE character_certificate SET memorandum_no = ?, village = ?, applicant_name = ?, post_office = ?, guardian_name = ?, word_no = ?, mother_name =? , marital_status = ? WHERE id = ?", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/character_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM character_certificate WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Character Certificate End

// Citizen Certificate Start
// Post Data
app.post('/citizen_certificate', (req, res) => {
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    console.log(req.body);
    db.query("INSERT INTO citizen_certificate (memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/citizen_certificate', (req, res) => {
    db.query("SELECT * FROM citizen_certificate", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/citizen_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM citizen_certificate  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/citizen_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    db.query("UPDATE citizen_certificate SET memorandum_no = ?, village = ?, applicant_name = ?, post_office = ?, guardian_name = ?, word_no = ?, mother_name =? , marital_status = ? WHERE id = ?", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/citizen_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM citizen_certificate WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Citizen Certificate End

// Inheritance Certificate Start
// Post Data
app.post('/inheritance_certificate', (req, res) => {
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    console.log(req.body);
    db.query("INSERT INTO inheritance_certificate (memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/inheritance_certificate', (req, res) => {
    db.query("SELECT * FROM inheritance_certificate", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get a Data
app.get('/inheritance_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM inheritance_certificate  WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/inheritance_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const memorandum_no = req.body.memorandum_no;
    const village = req.body.village;
    const applicant_name = req.body.applicant_name;
    const post_office = req.body.post_office;
    const guardian_name = req.body.guardian_name;
    const word_no = req.body.word_no;
    const mother_name = req.body.mother_name;
    const marital_status = req.body.marital_status;
    db.query("UPDATE inheritance_certificate SET memorandum_no = ?, village = ?, applicant_name = ?, post_office = ?, guardian_name = ?, word_no = ?, mother_name =? , marital_status = ? WHERE id = ?", [memorandum_no, village, applicant_name, post_office, guardian_name, word_no, mother_name, marital_status, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/inheritance_certificate/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM inheritance_certificate WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Inheritance Certificate End

// Notice Start
// Post Data
app.post('/notice', (req, res) => {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    const image = req.files.image;
    // const uploadPath = __dirname + '/upload/' + image.name;
    // image.mv(uploadPath, function (err){
    //     if (err) return res.status(500).send(err);
    //     res.send('fileUpload')
    // })
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    // console.log(title, subtitle, desc, imgBuffer);

    db.query("INSERT INTO notice_table (title, sub_title, description, image) VALUES (? , ? , ? , ?)", [title, subtitle, desc, imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/notice', (req, res) => {
    db.query("SELECT * FROM notice_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/notice/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM notice_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/notice/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    db.query("UPDATE notice_table SET title = ?, sub_title = ?, description = ?, image = ? WHERE id = ?", [title, subtitle, desc, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/notice/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM notice_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Notice End

// Resident Page Start
// Post Data
app.post('/president', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    // console.log(name, location, imgBuffer);

    db.query("INSERT INTO president_table (name, location, image) VALUES (? , ? , ?)", [name, location, imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/president', (req, res) => {
    db.query("SELECT * FROM president_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/president/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM president_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/president/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    db.query("UPDATE president_table SET name = ?, location = ?, image = ? WHERE id = ?", [name, location, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/president/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM president_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Resident Page End

// Commerse Page Start
// Post Data
app.post('/pcommerce', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    // console.log(name, location, imgBuffer);

    db.query("INSERT INTO pcommerce_table (name, location, image) VALUES (? , ? , ?)", [name, location, imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/pcommerce', (req, res) => {
    db.query("SELECT * FROM pcommerce_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/pcommerce/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM pcommerce_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/pcommerce/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    db.query("UPDATE pcommerce_table SET name = ?, location = ?, image = ? WHERE id = ?", [name, location, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/pcommerce/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM pcommerce_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Commerse Page End

// Contact Page Start
// Post Data
app.post('/pcontact', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    // console.log(name, location, imgBuffer);

    db.query("INSERT INTO pcontact_table (name, location, image) VALUES (? , ? , ?)", [name, location, imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/pcontact', (req, res) => {
    db.query("SELECT * FROM pcontact_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/pcontact/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("SELECT * FROM pcontact_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/pcontact/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const location = req.body.location;
    const image = req.files.image;
    const imgData = image.data;
    const encodedImg = imgData.toString("base64");
    const imgBuffer = Buffer.from(encodedImg);
    db.query("UPDATE pcontact_table SET name = ?, location = ?, image = ? WHERE id = ?", [name, location, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delate Data
app.delete('/pcontact/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query("DELETE FROM pcontact_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});
// Contact Page End

// Page Main Start
// Get Data
app.get('/pmain', (req, res) => {
    db.query("SELECT * FROM pmain_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Data
app.put('/pmain', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE pmain_table SET name = ?, location = ?, title = ?, description = ?, image = ?", [name, location, title, description, imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Page Main End

// Page Main Image Start
// Post Data
app.post('/pbimage', (req, res) => {
    const title = req.body.title;
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("INSERT INTO pbimage_table (title, image) VALUES (?, ?)", [title, imgBuffer], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/pbimage', (req, res) => {
    db.query("SELECT * FROM pbimage_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/pbimage/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM pbimage_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Data
app.put('/pbimage/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE pbimage_table SET title = ?, image = ? WHERE id = ?", [title, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Delete Data 
app.delete('/pbimage/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM pbimage_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Page Main Image End

// Website Chairman Start
// Get Data
app.get('/wchairman', (req, res) => {
    db.query("SELECT * FROM wchairman_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Image
app.put('/wchairman/image', (req, res) => {
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE wchairman_table SET image = ?", [imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})

// Update Data
app.put('/wchairman', (req, res) => {
    const name = req.body.name;
    const phone_o = req.body.phone_o;
    const phone = req.body.phone;
    const doj = req.body.doj;
    const email = req.body.email;
    const fax = req.body.fax;

    db.query("UPDATE wchairman_table SET name = ?, phone_o = ?, phone = ?, doj = ?, email = ?, fax = ?", [name, phone_o, phone, doj, email, fax], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Website Chairman End

// Website Sacib Start
// Get Data
app.get('/wsacib', (req, res) => {
    db.query("SELECT * FROM wsacib_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Image
app.put('/wsacib/image', (req, res) => {
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE wsacib_table SET image = ?", [imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})

// Update Data
app.put('/wsacib', (req, res) => {
    const name = req.body.name;
    const phone_o = req.body.phone_o;
    const phone = req.body.phone;
    const doj = req.body.doj;
    const email = req.body.email;
    const fax = req.body.fax;

    db.query("UPDATE wsacib_table SET name = ?, phone_o = ?, phone = ?, doj = ?, email = ?, fax = ?", [name, phone_o, phone, doj, email, fax], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Website Sacib End

// Website Panel Start
// Get Data
app.get('/wpanel', (req, res) => {
    db.query("SELECT * FROM wpanel_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Update Image
app.put('/wpanel/image', (req, res) => {
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE wpanel_table SET image = ?", [imgBuffer], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})

// Update Data
app.put('/wpanel', (req, res) => {
    const name = req.body.name;
    const phone_o = req.body.phone_o;
    const phone = req.body.phone;
    const doj = req.body.doj;
    const email = req.body.email;
    const fax = req.body.fax;

    db.query("UPDATE wpanel_table SET name = ?, phone_o = ?, phone = ?, doj = ?, email = ?, fax = ?", [name, phone_o, phone, doj, email, fax], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Website Panel End

// Website member start
// Post Data
app.post('/wmember', (req, res) => {
    const desi = req.body.desi;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const doj = req.body.doj;
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("INSERT INTO wmember_table (desi, name, phone, email, doj, image) VALUES (?, ?, ?, ?, ?, ?)", [desi, name, phone, email, doj, imgBuffer], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Get Data
app.get('/wmember', (req, res) => {
    db.query("SELECT * FROM wmember_table", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/wmember/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM wmember_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/wmember/:id', (req, res) => {
    const id = req.params.id;
    const desi = req.body.desi;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const doj = req.body.doj;
    const image = req.files.image;
    const imageData = image.data;
    const encodeImg = imageData.toString("base64");
    const imgBuffer = Buffer.from(encodeImg);

    db.query("UPDATE wmember_table SET desi = ?, name = ?, phone = ?, email = ?, doj = ?, image = ? WHERE id = ?", [desi, name, phone, email, doj, imgBuffer, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})

// Delete Data
app.delete('/wmember/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM wmember_table WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});
// Website member end

// authentication start
// register a user
app.post('/reg_db_user', (req, res) => {
    const email = 'a@a.com';
    const password = '1234';

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("INSERT INTO db_user (email, pass) VALUES (?, ?)", [email, hash], (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result);
            }
        })
    })
});

// Get Data
app.get('/reg_db_user', (req, res) => {
    db.query("SELECT * FROM db_user", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// login post
app.post('/db_user', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    db.query("SELECT * FROM db_user WHERE email = ?", email, (err, result) => {
        if (err) {
            res.send(err)
        } else if (result.length > 0) {
            bcrypt.compare(pass, result[0].pass, (error, response) => {
                if (response) {
                    req.session.email = result;
                    console.log(req.session.email);
                    res.send(response)
                } else {
                    res.send("Check & and try again.");
                    res.send(error);
                }
            })
        } else {
            res.send("User don't exists!")
        }
    })
})

// login post
app.get('/db_user', (req, res) => {
    if (req.session.email) {
        res.send({ loggedIn: true, user: req.session.email });
    } else {
        res.send({ loggedIn: false });
    }
});

// logout
// app.get('/logout',(req,res) => {
//   req.session.destroy(function (err) {
//         if (err) {
//             return res.send(err);
//         } else {
//             res.send("Logged out!")  
//         }
//     })
// });
// authentication end

// DB home start
// Get Data
app.get('/db_home', (req, res) => {
    db.query("SELECT * FROM db_home", (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
});

// Get A Data
app.get('/db_home/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM db_home WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
});

// Update Data
app.put('/db_home/:id', (req, res) => {
    const id = req.params.id;
    const word_no = req.body.word_no;
    const resident_thana = req.body.resident_thana;
    const commerce_thana = req.body.commerce_thana;
    const resident_tax = req.body.resident_tax;
    const commerce_tax = req.body.commerce_tax;
    const total = req.body.total;
    const autism = req.body.autism;
    const expatriate = req.body.expatriate;
    const widow = req.body.widow;
    const beggar = req.body.beggar;
    const freedom_fighters = req.body.freedom_fighters;
    const total_population = req.body.total_population;

    db.query("UPDATE db_home SET word_no = ?, resident_thana = ?, commerce_thana = ?, resident_tax = ?, commerce_tax = ?, total = ?, autism = ?, expatriate = ?, widow = ?, beggar = ?, freedom_fighters = ?, total_population = ?, WHERE id = ?", [word_no, resident_thana, commerce_thana, resident_tax, commerce_tax, total, autism, expatriate, widow, beggar, freedom_fighters, total_population, id], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    });
})
// DB home end


app.get('/', (req, res) => {
    res.send('Server is Running...')
});

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
