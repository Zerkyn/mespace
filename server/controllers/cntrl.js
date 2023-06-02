module.exports = {

    register: (req, res) => {
        console.log(req.body)
        res.status(200).send(req.body)
    },

    login: (req, res) => {
        console.log(req.body)
        res.status(200).send(req.body)
    }
}