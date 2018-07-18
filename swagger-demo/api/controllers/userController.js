const User = require('../../models/user').User;

module.exports = {
    findUsers: findUsers,
    deleteUserById: deleteUserById
};

function findUsers(req, res) {
    User.find((err, users) => {
        if (users && users.length > 0) {
            res.json(users);
        } else {
            res.status(404).send('Not Found');
        }
    });
}

function deleteUserById(req, res) {
    const userId = req.swagger.params.userId.value;

    User.deleteOne({ _id: userId }).then(() => {
        res.status(200).send({status:'OK'});
    }).catch((err) => res.status(500).send('server error' + err));
}
