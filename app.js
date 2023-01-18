const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose');
const http = require('https');
mongoose.set('strictQuery', true);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("Public"));

mongoose.connect('mongodb://127.0.0.1:27017/Candidates', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Connected to database!`);
    })
    .catch((err) => {
        console.log(err);
    })

const candidateSchema = {
    competition: String,
    name: {
        type: String,
        required: [true, "Please fill in this field!"]
    },
    surname: {
        type: String,
        required: [true, "Please fill in this field!"]
    },
    grade: {
        type: Number,
        required: [true, "Please fill in this field!"]
    },
    school: {
        type: String,
        required: [true, "Please fill in this field!"]
    },
    province: {
        type: String,
        required: [true, "Please fill in this field!"]
    },
    email: {
        type: String,
        required: [true, "Please fill in this field!"]
    },
    cell: {
        type: String,
    }
}
const Candidate = mongoose.model('Candidate', candidateSchema);


const teamShema = {
    competition1: {
        type: String,
        required: false
    },
    name1: {
        type: String,
        required: false
    },
    surname1: {
        type: String,
        required: false
    },
    grade1: {
        type: Number,
        required: false
    },
    school1: {
        type: String,
        required: false
    },
    province1: {
        type: String,
        required: false
    },
    email1: {
        type: String,
        required: false
    },
    cell1: {
        type: String,
    },

    competition2: {
        type: String,
        required: false
    },
    name2: {
        type: String,
        required: false
    },
    surname2: {
        type: String,
        required: false
    },
    grade2: {
        type: Number,
        required: false
    },
    school2: {
        type: String,
        required: false
    },
    province2: {
        type: String,
        required: false
    },
    email2: {
        type: String,
        required: false
    },
    cell2: {
        type: String,
    },

    competition3: {
        type: String,
        required: false
    },
    name3: {
        type: String,
        required: false
    },
    surname3: {
        type: String,
        required: false
    },
    grade3: {
        type: Number,
        required: false
    },
    school3: {
        type: String,
        required: false
    },
    province3: {
        type: String,
        required: false
    },
    email3: {
        type: String,
        required: false
    },
    cell3: {
        type: String,
    },

    competition4: {
        type: String,
        required: false
    },
    name4: {
        type: String,
        required: false
    },
    surname4: {
        type: String,
        required: false
    },
    grade4: {
        type: Number,
        required: false
    },
    school4: {
        type: String,
        required: false
    },
    province4: {
        type: String,
        required: false
    },
    email4: {
        type: String,
        required: false
    },
    cell4: {
        type: String,
    }
}
const Team = mongoose.model('Team', teamShema);



app.get('/', function (req, res) {
    res.render("afr/home", {
        currentTitle: 'Tuis',
        currentPageTitle: "Tuis",
        currentPageName: 'main'
    });
});
app.get('/en/main', (req, res) => {
    res.render('en/home', {
        currentTitle: 'Home',
        currentPageTitle: 'Home',
        currentPageName: ''
    });
})

app.get('/entry', function (req, res) {

    const url = 'https://api.payfast.co.za/process';

    http.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            paymentData = JSON.parse(data);
        })
    });

    Candidate.find({}, (err, foundItems) => {

        if (!err) {

            res.render("afr/Entry_form", {
                currentTitle: 'Inskrywingsvorm',
                newListItems: foundItems,
                currentPageTitle: 'Inskrywingsvorm',
                currentPageName: 'entry'
            });
        }
    });

});

app.post('/entryTest', (req, res) => {
    console.log('This is working so far!')
});

app.get('/:personFormArea', (req, res) => {
    const paramName = req.params.personFormArea;
});

app.post('/entry', (req, res) => {


    const cName = req.body.competitionname;
    const pName = req.body.participantName;
    const pSurname = req.body.participantSurname;
    const pGrade = req.body.participantGrade;
    const pSchool = req.body.participantSchool;
    const pEmail = req.body.participantEmail;
    const pProvince = req.body.participantProvence;
    const pNumber = req.body.participantNumber;

    const candidate = new Candidate({

        competition: cName,
        name: pName,
        surname: pSurname,
        grade: pGrade,
        school: pSchool,
        province: pProvince,
        email: pEmail,
        cell: pNumber
    });

    candidate.save();
    res.redirect('/entry');

});

app.get('/en/entry', (req, res) => {
    Candidate.find({}, (err, foundItems) => {

        if (!err) {

            res.render("en/Entry_form", {
                currentTitle: 'Entry form',
                newListItems: foundItems,
                currentPageTitle: 'Entry Form',
                currentPageName: 'entry'
            });
        }
    });
})

app.post('/en/entry', (req, res) => {


    const cName = req.body.competitionname;
    const pName = req.body.participantName;
    const pSurname = req.body.participantSurname;
    const pGrade = req.body.participantGrade;
    const pSchool = req.body.participantSchool;
    const pEmail = req.body.participantEmail;
    const pProvince = req.body.participantProvence;
    const pNumber = req.body.participantNumber;

    const candidate = new Candidate({

        competition: cName,
        name: pName,
        surname: pSurname,
        grade: pGrade,
        school: pSchool,
        province: pProvince,
        email: pEmail,
        cell: pNumber
    });

    candidate.save();
    res.redirect('/en/entry');

});



app.get('/teams', (req, res) => {

    Team.find({}, (err, foundTeams) => {
        if (!err) {
            res.render("afr/teams", {
                currentTitle: 'Spanne',
                newListTeams: foundTeams,
                currentPageTitle: 'Spanne form',
                currentPageName: 'teams'
            });
        }
    });

})

app.post('/teams', function (req, res) {

    const cName1 = req.body.competitionName1;
    const pName1 = req.body.participantName1;
    const pSurname1 = req.body.participantSurname1;
    const pGrade1 = req.body.participantGrade1;
    const pSchool1 = req.body.participantSchool1;
    const pEmail1 = req.body.participantEmail1;
    const pProvince1 = req.body.participantProvence1;
    const pNumber1 = req.body.participantNumber1;

    const cName2 = req.body.competitionname2;
    const pName2 = req.body.participantName2;
    const pSurname2 = req.body.participantSurname2;
    const pGrade2 = req.body.participantGrade2;
    const pSchool2 = req.body.participantSchool2;
    const pEmail2 = req.body.participantEmail2;
    const pProvince2 = req.body.participantProvence2;
    const pNumber2 = req.body.participantNumber2;

    const cName3 = req.body.competitionname3;
    const pName3 = req.body.participantName3;
    const pSurname3 = req.body.participantSurname3;
    const pGrade3 = req.body.participantGrade3;
    const pSchool3 = req.body.participantSchool3;
    const pEmail3 = req.body.participantEmail3;
    const pProvince3 = req.body.participantProvence3;
    const pNumber3 = req.body.participantNumber3;

    const cName4 = req.body.competitionname4;
    const pName4 = req.body.participantName4;
    const pSurname4 = req.body.participantSurname4;
    const pGrade4 = req.body.participantGrade4;
    const pSchool4 = req.body.participantSchool4;
    const pEmail4 = req.body.participantEmail4;
    const pProvince4 = req.body.participantProvence4;
    const pNumber4 = req.body.participantNumber4;

    const team = new Team({
        competition1: cName1,
        name1: pName1,
        surname1: pSurname1,
        grade1: pGrade1,
        school1: pSchool1,
        email1: pEmail1,
        province1: pProvince1,
        pNumber1: pNumber1,

        competition2: cName2,
        name2: pName2,
        surname2: pSurname2,
        grade2: pGrade2,
        school2: pSchool2,
        email2: pEmail2,
        province2: pProvince2,
        pNumber2: pNumber2,

        competition3: cName3,
        name3: pName3,
        surname3: pSurname3,
        grade3: pGrade3,
        school3: pSchool3,
        email3: pEmail3,
        province3: pProvince3,
        pNumber3: pNumber3,

        competition4: cName4,
        nam43: pName4,
        surname4: pSurname4,
        grade4: pGrade4,
        school4: pSchool4,
        email4: pEmail4,
        province4: pProvince4,
        pNumber4: pNumber4,

    });



    team.save();
    res.redirect('/teams');

});

app.get('/en/teams', (req, res) => {

    Team.find({}, (err, foundTeams) => {
        if (!err) {
            res.render("en/teams", {
                currentTitle: 'Teams',
                newListTeams: foundTeams,
                currentPageTitle: 'Teams form',
                currentPageName: 'teams'
            });
        }
    });

})

app.post('/en/teams', function (req, res) {

    const cName1 = req.body.competitionName1;
    const pName1 = req.body.participantName1;
    const pSurname1 = req.body.participantSurname1;
    const pGrade1 = req.body.participantGrade1;
    const pSchool1 = req.body.participantSchool1;
    const pEmail1 = req.body.participantEmail1;
    const pProvince1 = req.body.participantProvence1;
    const pNumber1 = req.body.participantNumber1;

    const cName2 = req.body.competitionname2;
    const pName2 = req.body.participantName2;
    const pSurname2 = req.body.participantSurname2;
    const pGrade2 = req.body.participantGrade2;
    const pSchool2 = req.body.participantSchool2;
    const pEmail2 = req.body.participantEmail2;
    const pProvince2 = req.body.participantProvence2;
    const pNumber2 = req.body.participantNumber2;

    const cName3 = req.body.competitionname3;
    const pName3 = req.body.participantName3;
    const pSurname3 = req.body.participantSurname3;
    const pGrade3 = req.body.participantGrade3;
    const pSchool3 = req.body.participantSchool3;
    const pEmail3 = req.body.participantEmail3;
    const pProvince3 = req.body.participantProvence3;
    const pNumber3 = req.body.participantNumber3;

    const cName4 = req.body.competitionname4;
    const pName4 = req.body.participantName4;
    const pSurname4 = req.body.participantSurname4;
    const pGrade4 = req.body.participantGrade4;
    const pSchool4 = req.body.participantSchool4;
    const pEmail4 = req.body.participantEmail4;
    const pProvince4 = req.body.participantProvence4;
    const pNumber4 = req.body.participantNumber4;

    const team = new Team({
        competition1: cName1,
        name1: pName1,
        surname1: pSurname1,
        grade1: pGrade1,
        school1: pSchool1,
        email1: pEmail1,
        province1: pProvince1,
        pNumber1: pNumber1,

        competition2: cName2,
        name2: pName2,
        surname2: pSurname2,
        grade2: pGrade2,
        school2: pSchool2,
        email2: pEmail2,
        province2: pProvince2,
        pNumber2: pNumber2,

        competition3: cName3,
        name3: pName3,
        surname3: pSurname3,
        grade3: pGrade3,
        school3: pSchool3,
        email3: pEmail3,
        province3: pProvince3,
        pNumber3: pNumber3,

        competition4: cName4,
        nam43: pName4,
        surname4: pSurname4,
        grade4: pGrade4,
        school4: pSchool4,
        email4: pEmail4,
        province4: pProvince4,
        pNumber4: pNumber4,

    });



    team.save();
    res.redirect('/en/teams');

});

app.post('/deleteTeams', function (req, res) {
    const checkedItemId = req.body.checkbox;

    Team.findByIdAndDelete(checkedItemId, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Item is removed");
        }
    });

    res.redirect('/teams');
});

app.post('/en/deleteTeams', function (req, res) {
    const checkedItemId = req.body.checkbox;

    Team.findByIdAndDelete(checkedItemId, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Item is removed");
        }
    });

    res.redirect('/en/teams');
});


app.post('/en/delete', function (req, res) {
    const checkedItemId = req.body.checkbox;
    Candidate.findByIdAndDelete(checkedItemId, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Item is removed");
        }
    });

    res.redirect('/en/entry');
});


app.get('/results', function (req, res) {
    res.render('afr/results', {
        currentTitle: 'Uitslae',
        currentPageTitle: 'UItslae',
        currentPageName: 'results'
    });
});

app.get('/en/results', function (req, res) {
    res.render('en/results', {
        currentTitle: 'Results',
        currentPageTitle: 'Results',
        currentPageName: 'results'
    });
});

app.get('/info', function (req, res) {
    res.render('afr/Competition info', {
        currentTitle: 'Kompetisie Inligting',
        currentPageTitle: 'Kompetisie Inligting',
        currentPageName: 'info'
    });
});

app.get('/en/info', function (req, res) {
    res.render('en/Competition info', {
        currentTitle: 'Competition Info',
        currentPageTitle: 'Competition Info',
        currentPageName: 'info'
    });
});

app.get('/contact-us', function (req, res) {
    res.render('afr/Contact Us', {
        currentTitle: 'Kontak Form',
        currentPageTitle: 'Kontak Form',
        currentPageName: 'contact-us'
    });
});

app.get('/en/contact-us', function (req, res) {
    res.render('en/Contact Us', {
        currentTitle: 'Contact Form',
        currentPageTitle: 'Contact Form',
        currentPageName: 'contact-us'
    });
});

app.get('/national-round', function (req, res) {
    res.render('afr/National-round', {
        currentTitle: 'Nasionale Rondte',
        currentPageTitle: 'Nasionale Rondte',
        currentPageName: 'National-round'
    });
});

app.get('/en/national-round', function (req, res) {
    res.render('en/National-round', {
        currentTitle: 'National round',
        currentPageTitle: 'National round',
        currentPageName: 'National-round'
    });
});

app.get('/admin', function (req, res) {
    res.render('admin');
});


app.post('/payment', (req, res) => {
    // Anonymous test key. Replace with your key.
    const SECRET_KEY = 'sk_test_e16d2c26gezaRKl906f46349f6f1';

    axios.post('https://online.yoco.com/v1/charges/', {
                token: req.body.token,
                amountInCents: 25000,
                currency: 'ZAR',
            }, {
                headers: {
                    'X-Auth-Secret-Key': SECRET_KEY,
                },
            },
        )
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.response.data);
        })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('App is running on port 3000');
});