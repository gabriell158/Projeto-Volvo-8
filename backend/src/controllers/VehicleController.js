const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('vehicles').count();

        const vehicles = await connection('vehicles')
            .join('users','users.id','=','vehicles.user_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'vehicles.*',
                'users.name',
                'users.email'
                /*'users.whatsapp'*/
            ]);

        response.header('X-total-count', count['count(*)']);
        
        return response.json(vehicles);
    },
    async create(request,response) {
        const { title, description } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('vehicles').insert({
            title,
            description,
            user_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const vehicles = await connection('vehicles')
            .where('id',id)
            .select('user_id')
            .first();

        if (vehicles.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('vehicles').where('id', id).delete();

        return response.status(204).send();
    }
}