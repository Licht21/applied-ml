const {predictClassification} = require('../services/inferenceService')
const crypto = require('crypto')
const storeData = require('../services/storeData');
const loadData = require('../services/loadData');

async function postPredictHandler(request, h) {
    const {image} = request.payload
    const {model} = request.server.app

    const {label, suggestion} = await predictClassification(model,image)
    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    const data = {
        "id":id,
        "result":label,
        "suggestion":suggestion,
        "createdAt":createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status:"success",
        message:"Model is predicted successfully",
        data
    })
    response.code(201)
    return response
        

}

async function getHistories(request, h){
    const data = await loadData()
    const response = h.response({
        status:"success",
        data:data
    })
    return response
}

module.exports = {postPredictHandler, getHistories}