const express = require("express");
const router = express.Router();
const admin_route = require('./admin_route');
const user_route = require('./userRoutes');
const User = require('../models/useModel')


router.get('/get', async (req, res) => {
        const customers = await User.find().sort('name');
        res.send(customers);
});

router.post('/post', async (req, res) => {
        // const schema = Joi.object({
        //     name: Joi.string().min(1).max(50).required(),
        //     email: Joi.string().min(1).max(50).required(),
        // });

        // const result = schema.validate(req.body);
        console.log(req.body);
        // if (result.error) {
        //     return res.status(400).send(result.error.details[0].message);                
        // };
        let users = new User(req.body);
        let result = await users.save();

        res.send(result);
});

router.put('/put/:id', async (req, res) => {
        const users = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email }, { name: true });

        if (!users) return res.status(404).send('The request is not given in body.!');

        res.send(users);
})

router.delete('/delete/:id', async (req, res) => {
        const users = await User.findByIdAndRemove(req.params.id);

        if (!users) return res.status(404).send('The request is not given in body.!');

        res.send(users);
})

router.get("/test", async function (req, res) {
        res.send({ "result": "success", "msg": "Server successfully configured" })
});

router.use('/', admin_route);
router.use('/', user_route);

module.exports = router;