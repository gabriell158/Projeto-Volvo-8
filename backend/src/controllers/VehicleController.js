const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('vehicles').count();

        const vehicles = await connection('vehicles')
            .join('users','users.id','=','vehicles.userId')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'vehicles.*',
                'users.userName',
                'users.email'
                /*'users.whatsapp'*/
            ]);

        response.header('X-total-count', count['count(*)']);
        
        return response.json(vehicles);
    },
    async create(request,response) {
        const { vehicleName, description, equipList } = request.body;
        const userId = request.headers.authorization;
        if (userId == null) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        
        const [id] = await connection('vehicles').insert({
            vehicleName,
            description,
            equipList,
            userId,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const userId = request.headers.authorization;

        const vehicles = await connection('vehicles')
            .where('id',id)
            .select('userId')
            .first();

        // if (vehicles.userId != userId) {
        //     return response.status(401).json({ error: 'Operation not permitted.' });
        // }

        await connection('vehicles').where('id', id).delete();

        return response.status(204).send();
    }
}