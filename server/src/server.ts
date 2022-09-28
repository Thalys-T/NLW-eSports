import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client';
import { convertHourToMinutes } from './utils/convert-hour-to-minutes';
import { convertMinutestoHour } from './utils/convert-minutes-to-hours';

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
})
//http://localhost:3333/ads    --exit--child

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select:{
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body = request.body;
   
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourToMinutes(body.hourStart),
            hourEnd: convertHourToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })
    
    return response.status(201).json(body);
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId= request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
    console.log('aquio', "%cThis is a green text", "color:green");
    return response.json(ads.map(ad => {
        
        return {
            ...ad,
            weekDays: ad?.weekDays.split(','),
            hourStart: convertMinutestoHour(ad.hourStart),
            hourEnd: convertMinutestoHour(ad.hourEnd),
        }
    }))
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId= request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,            
        },
        where:{
            id: adId,
        }
    })
    return response.json({
        discord: ad.discord,
    })
})


app.listen(3333)