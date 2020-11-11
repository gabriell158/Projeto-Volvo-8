const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('equipments').count();

        const equipments = await connection('equipments')
            .join('users','users.id','=','equipments.userId')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'equipments.*',
                'users.userName',
                'users.email'
                /*'users.whatsapp'*/
            ]);

        response.header('X-total-count', count['count(*)']);
        
        return response.json(equipments);
    },
    async create(request,response) {
        const { equipName, description, quantity, location } = request.body;
        const userId = request.headers.authorization;

        if(userId == null) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        const [id] = await connection('equipments').insert({
            equipName,
            description,
            quantity,
            location,
            userId,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const userId = request.headers.authorization;

        const equipments = await connection('equipments')
            .where('id',id)
            .select('userId')
            .first();

        // if (equipments.userId != userId) {
        //     return response.status(401).json({ error: 'Operation not permitted.' });
        // }

        await connection('equipments').where('id', id).delete();

        return response.status(204).send();
    }
}