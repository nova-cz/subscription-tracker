/*
* Un controller (controlador) es un archivo o módulo que
* contiene la lógica de lo que ocurre cuando un usuario
* hace una petición a una ruta específica.
*
*  Las rutas (routes) definen qué endpoint existe.
️*  Los controllers definen qué pasa cuando ese endpoint se ejecuta.
* */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req,res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        //Logic to create a new user
        const {name, email, password} = req.body;

        //Check if the user already exists
        const existinguser = await User.findOne( { email } );

        if(existinguser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Creando User
        const newUsers = await User.create([{name, email, password: hashedPassword}], { session });

        //Creando token
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        //Finalmente creamos la session
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully.',
            data: {
                token,
                user: newUsers[0]
            }
        })

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const signIn= async (req,res,next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});

        res.status(201).json({
            success: true,
            message: 'User signed in successfully.',
            data: {
                token,
                user,
            }
        });

    }catch (error) {
        next(error);
    }
}

export const signOut = async (req,res,next) => {}
