const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const http = require('https');
const { response } = require('express');
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

const candidateSchema = { //This is the schema for entries in the individual entry form
    competition : String,
    name : String,
    surname : String,
    grade : Number,
    school : String,
    province : String,
    email : String,
    cell : String,
}
const Candidate = mongoose.model('Candidate', candidateSchema);


const teamShema = { //This used in the app.post(/teams..) and app.post(/en/teams...) 
    competition1: {type: String,required: false},
    name1: {type: String,required: false},
    surname1: {type: String,required: false},
    grade1: {type: Number,required: false},
    school1: {type: String,required: false},
    province1: {type: String,required: false},
    email1: {type: String,required: false},
    cell1: {type: String,},

    competition2: {type: String,required: false},
    name2: {type: String,required: false},
    surname2: {type: String,required: false},
    grade2: {type: Number,required: false},
    school2: {type: String,required: false},
    province2: {type: String,required: false},
    email2: {type: String,required: false},
    cell2: {type: String,},

    competition3: {type: String,required: false},
    name3: {type: String,required: false},
    surname3: {type: String,required: false},
    grade3: {type: Number,required: false},
    school3: {type: String,required: false},
    province3: {type: String,required: false},
    email3: {type: String,required: false},
    cell3: {type: String,},

    competition4: {type: String,required: false},
    name4: {type: String,required: false},
    surname4: {type: String,required: false},
    grade4: {type: Number,required: false},
    school4: {type: String,required: false},
    province4: {type: String,required: false},
    email4: {type: String,required: false},
    cell4: {type: String,}
}
const Team = mongoose.model('Team', teamShema);

//The website consists of two languages, so all files are doubled with simply the lamguage being changed. The root route is Afrikaans (afr), 
//thus whenever an entry repeats but with an en/ preceding it, it will be the same, 
//but containing English (e.g. post('/entry) and post('/en/entry))

app.get('/', function (req, res) {
    res.render("afr/home", {
        currentTitle: 'Tuis', //This is for the html <title> tag 
        currentPageTitle: "TUIS", //This is a text that appears on the image beneath the nav-bar (in header.ejs) (id="association-statement")
        currentPageName: 'main' //This is used for dynamically linking between the en and afr pages in the header.ejs files
    });
});
app.get('/en/main', (req, res) => {
    res.render('en/home', {
        currentTitle: 'Home',
        currentPageTitle: 'HOME',
        currentPageName: ''
    });
})

app.get('/entry', function (req, res) {

    Candidate.find({}, (err, foundItems) => {

        if (!err) {

            res.render("afr/Entry_form", {
                currentTitle: 'Inskrywingsvorm',
                newListItems: foundItems,
                currentPageTitle: 'INSKRYWINGSVORM',
                currentPageName: 'entry'
            });
        }
    });

});


app.post('/entry', (req, res) => {


    const childEntries = req.body.childEntries;

    for (let i = 1; i <= childEntries; i++) {

        const cName = req.body[`competitionName${i}`];
        const pName = req.body[`participantName${i}`];
        const pSurname = req.body[`participantSurname${i}`];
        const pGrade = req.body[`participantGrade${i}`];
        const pSchool = req.body[`participantSchool${i}`];
        const pProvince = req.body[`participantProvince${i}`];
        const pEmail = req.body[`participantEmail${i}`];
        const pNumber = req.body[`participantNumber${i}`];

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

        console.log(candidate);
    }

    res.redirect('/entry');

});

app.get('/en/entry', (req, res) => {
    Candidate.find({}, (err, foundItems) => {

        if (!err) {

            res.render("en/Entry_form", {
                currentTitle: 'Entry form',
                newListItems: foundItems,
                currentPageTitle: 'ENTRY FORM',
                currentPageName: 'entry'
            });
        }
    });
})

app.post('/en/entry', (req, res) => {

    const childEntries = req.body.childEntries;
    const candidate = new Candidate({});

    for (let i = 1; i <= childEntries; i++) {

        const cName = req.body[`competitionName${i}`];
        const pName = req.body[`participantName${i}`];
        const pSurname = req.body[`participantSurname${i}`];
        const pGrade = req.body[`participantGrade${i}`];
        const pSchool = req.body[`participantSchool${i}`];
        const pProvince = req.body[`participantProvince${i}`];
        const pEmail = req.body[`participantEmail${i}`];
        const pNumber = req.body[`participantNumber${i}`];

        candidate = new Candidate({
            competition: cName,
            name: pName,
            surname: pSurname,
            grade: pGrade,
            school: pSchool,
            province: pProvince,
            email: pEmail,
            cell: pNumberntPageTitle
        });

        
    }
    console.log(candidate.name);
    res.redirect('/en/entry');

});



app.get('/teams', (req, res) => {

    Team.find({}, (err, foundTeams) => {
        if (!err) {
            res.render("afr/teams", {
                currentTitle: 'Spanne',
                newListTeams: foundTeams,
                currentPageTitle: 'SPANNE VORM',
                currentPageName: 'teams'
            });
        }
    });

})

app.post('/teams', (req, res) => {

    const childEntries = req.body.childEntries;

    for (let i = 1; i < childEntries; i=i+4) {

        const cName1 = req.body[`competitionName1${i}`];
        const pName1 = req.body[`participantName1${i}`];
        const pSurname1 = req.body[`participantSurname1${i}`];
        const pGrade1 = req.body[`participantGrade1${i}`];
        const pSchool1 = req.body[`participantSchool1${i}`];
        const pEmail1 = req.body[`participantEmail1${i}`];
        const pProvince1 = req.body[`participantProvence1${i}`];
        const pNumber1 = req.body[`participantNumber1${i}`];

        const cName2 = req.body[`competitionname2${i}`];
        const pName2 = req.body[`participantName2${i}`];
        const pSurname2 = req.body[`participantSurname2${i}`];
        const pGrade2 = req.body[`participantGrade2${i}`];
        const pSchool2 = req.body[`participantSchool2${i}`];
        const pEmail2 = req.body[`participantEmail2${i}`];
        const pProvince2 = req.body[`participantProvence2${i}`];
        const pNumber2 = req.body[`participantNumber2${i}`];

        const cName3 = req.body[`competitionname3${i}`];
        const pName3 = req.body[`participantName3${i}`];
        const pSurname3 = req.body[`participantSurname3${i}`];
        const pGrade3 = req.body[`participantGrade3${i}`];
        const pSchool3 = req.body[`participantSchool3${i}`];
        const pEmail3 = req.body[`participantEmail3${i}`];
        const pProvince3 = req.body[`participantProvence3${i}`];
        const pNumber3 = req.body[`participantNumber3${i}`];

        const cName4 = req.body[`competitionname4${i}`];
        const pName4 = req.body[`participantName4${i}`];
        const pSurname4 = req.body[`participantSurname4${i}`];
        const pGrade4 = req.body[`participantGrade4${i}`];
        const pSchool4 = req.body[`participantSchool4${i}`];
        const pEmail4 = req.body[`participantEmail4${i}`];
        const pProvince4 = req.body[`participantProvence4${i}`];
        const pNumber4 = req.body[`participantNumber4${i}`];

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
    }
    res.redirect('/teams');

});

app.get('/en/teams', (req, res) => {

    Team.find({}, (err, foundTeams) => {
        if (!err) {
            res.render("en/teams", {
                currentTitle: 'Teams',
                newListTeams: foundTeams,
                currentPageTitle: 'TEAMS FORM',
                currentPageName: 'teams'
            });
        }
    });

})

app.post('/en/teams', (req, res) => {

    const childEntries = req.body.childEntries;

    for (let i = 1; i < childEntries; i=i+4) {

        const cName1 = req.body[`competitionName1${i}`];
        const pName1 = req.body[`participantName1${i}`];
        const pSurname1 = req.body[`participantSurname1${i}`];
        const pGrade1 = req.body[`participantGrade1${i}`];
        const pSchool1 = req.body[`participantSchool1${i}`];
        const pEmail1 = req.body[`participantEmail1${i}`];
        const pProvince1 = req.body[`participantProvence1${i}`];
        const pNumber1 = req.body[`participantNumber1${i}`];

        const cName2 = req.body[`competitionname2${i}`];
        const pName2 = req.body[`participantName2${i}`];
        const pSurname2 = req.body[`participantSurname2${i}`];
        const pGrade2 = req.body[`participantGrade2${i}`];
        const pSchool2 = req.body[`participantSchool2${i}`];
        const pEmail2 = req.body[`participantEmail2${i}`];
        const pProvince2 = req.body[`participantProvence2${i}`];
        const pNumber2 = req.body[`participantNumber2${i}`];

        const cName3 = req.body[`competitionname3${i}`];
        const pName3 = req.body[`participantName3${i}`];
        const pSurname3 = req.body[`participantSurname3${i}`];
        const pGrade3 = req.body[`participantGrade3${i}`];
        const pSchool3 = req.body[`participantSchool3${i}`];
        const pEmail3 = req.body[`participantEmail3${i}`];
        const pProvince3 = req.body[`participantProvence3${i}`];
        const pNumber3 = req.body[`participantNumber3${i}`];

        const cName4 = req.body[`competitionname4${i}`];
        const pName4 = req.body[`participantName4${i}`];
        const pSurname4 = req.body[`participantSurname4${i}`];
        const pGrade4 = req.body[`participantGrade4${i}`];
        const pSchool4 = req.body[`participantSchool4${i}`];
        const pEmail4 = req.body[`participantEmail4${i}`];
        const pProvince4 = req.body[`participantProvence4${i}`];
        const pNumber4 = req.body[`participantNumber4${i}`];

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
    }
    res.redirect('/teams');

});

app.post('/deleteTeams', (req, res) => {
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

app.post('/en/deleteTeams', (req, res) => {
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
        currentPageTitle: 'UITSLAE',
        currentPageName: 'results'
    });
});

app.get('/en/results', function (req, res) {
    res.render('en/results', {
        currentTitle: 'Results',
        currentPageTitle: 'RESULTS',
        currentPageName: 'results'
    });
});

app.get('/info', function (req, res) {
    res.render('afr/Competition info', {
        currentTitle: 'Kompetisie Inligting',
        currentPageTitle: 'KOMPETISIE INLIGTING',
        currentPageName: 'info'
    });
});

app.get('/en/info', function (req, res) {
    res.render('en/Competition info', {
        currentTitle: 'Competition Info',
        currentPageTitle: 'COMPETITION INFO',
        currentPageName: 'info'
    });
});

app.get('/contact-us', function (req, res) {
    res.render('afr/Contact Us', {
        currentTitle: 'Kontak Vorm',
        currentPageTitle: 'KONTAK VORM',
        currentPageName: 'contact-us'
    });
});

app.get('/en/contact-us', function (req, res) {
    res.render('en/Contact Us', {
        currentTitle: 'Contact Form',
        currentPageTitle: 'CONTACT FORM',
        currentPageName: 'contact-us'
    });
});

app.get('/national-round', function (req, res) {
    res.render('afr/National-round', {
        currentTitle: 'Nasionale Rondte',
        currentPageTitle: 'NASIONALE RONDTE',
        currentPageName: 'National-round'
    });
});

app.get('/en/national-round', function (req, res) {
    res.render('en/National-round', {
        currentTitle: 'National round',
        currentPageTitle: 'NATIONAL ROUND',
        currentPageName: 'National-round'
    });
});

app.get('/admin', function (req, res) {
    res.render('admin');
});


app.post('/payment', (req, res) => { //For the Yoco payment gateway
    const secretKey = 'sk_test_e16d2c26gezaRKl906f46349f6f1'
    axios.post('https://online.yoco.com/v1/charges/', {
        token: req.body.token,
        amountInCents: 24000,
        currency: 'ZAR'
    }, {
        headers: {
            'X-Auth-Secret-Key': secretKey
        } 
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.send(error.response.data);
    })
})


app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});