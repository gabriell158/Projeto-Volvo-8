const connection = require("../database/connection");

module.exports = {
    async index(request, response) {
        const userId = request.headers.authorization;

        const vehicles = await connection('equipments')
            .where('userId',userId)
            .select('*');

        response.json(vehicles);
    }
}