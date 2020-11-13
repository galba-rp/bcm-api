const  express= require ('express');
const router = express.Router();
const Team = require ('../models/Team');
const multer = require('multer');
const fs = require('fs');

//define storage for images
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads/')
    },
    //add back file extension
    filename: function(request, file, callback) {
        callback(null, file.originalname)
    }
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1042*1024*3
    }
})

// Get all teams
router.get('/teams', async(req, res) => {
    try
    {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.json({message: err});
    }
});

//Get specific team
// router.get('/:teamId', async (req, res) =>{
    
//     try {
//         const team = await Team.findById(req.params.teamId);
//         res.json(team);

//     } catch (err) {
//         res.json({message: err});
//     }
// }
// );

//Create a team
router.post('/createteam' , upload.single('image'), async (req, res) => {
    console.log(req.body);
    const team = new Team({
        name: req.body.name,
        img:{
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/jpeg'
        }
    });
    try{
        const savedTeam = await team.save();
        res.json(savedTeam);
    } catch(err) {
        res.json({message: err});
    }
    //    team.save()
    //     .then(data=>{
    //         res.json(data);
    //     })
    //     .catch(err=> {
    //         res.json({message: err});
    //     });
});


//Update a team
router.patch('/:teamId', async(req, res) => {
    try{
        const updatedTeam = await Team.updateOne(
            { _id: req.params.teamId }, 
            {$set : {name: req.body.name }}
        );
            res.json(updatedTeam);
    } catch (err) {
        res.json(err)
    }
})

//Delete specific team
    router.delete('/:teamId', async (req, res) => {
        try{
        const removedTeam =  await Team.remove({ _id: req.params.teamId })
        res.json(removedTeam);
        } catch (err) {
            res.json({ message: err });
        }
    } )




module.exports = router;
