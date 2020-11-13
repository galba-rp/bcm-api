const  express= require ('express');
const router = express.Router();
const Team = require ('../models/Team');
const multer = require('multer');
const upload = multer({dest: "uploads/"});



// Get all teams
router.get('/', async(req, res) => {
    try
    {
        const teams = await Team.find();
        console.log(res.json(teams));
    } catch (err) {
        res.json({message: err});
    }
});

//Get specific team
router.get('/:teamId', async (req, res) =>{
    
    try {
        const team = await Team.findById(req.params.teamId);
        res.json(team);

    } catch (err) {
        res.json({message: err});
    }
}
);

//Create a team
router.post('/' , upload.single('teamImage'), async (req, res) => {
    console.log(req.file);
    const team = new Team({
        name: req.body.name,
        img: {
            data: req.body.img.data,
            contentType: req.body.img.contentType
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
