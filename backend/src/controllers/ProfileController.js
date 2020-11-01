const connection = require("../database/connection");

module.exports = {
    async index(request, response) {
        const user_id = request.headers.authorization;

        const vehicles = await connection('vehicles')
            .where('user_id',user_id)
            .select('*');

        response.json(vehicles);
    }
}