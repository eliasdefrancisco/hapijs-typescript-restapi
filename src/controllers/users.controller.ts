import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import User from '../models/User'

export const createUser = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        const user = new User(request.payload)
        const userSaved = await user.save()
        return h.response(userSaved)
    } catch (error) {
        return h.response(error).code(500)
    }
}

export const getUsers = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        const users = await User.find()
        return h.response(users)
    } catch (error) {
        return h.response(error).code(500)
    }
}

export const getUser = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) return h.response().code(404)
        return h.response(user)
    } catch (error) {
        return h.response(error).code(500)
    }
}

export const deleteUser = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        const user = await User.findByIdAndDelete(request.params.id)
        if (!user) return h.response().code(404)
        return h.response(user)
    } catch (error) {
        return h.response(error).code(500)
    }
}

export const updateUser = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        const user = await User.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
        )
        if (!user) return h.response().code(404)
        return h.response(user)
    } catch (error) {
        return h.response(error).code(500)
    }
}