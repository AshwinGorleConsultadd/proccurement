import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def run():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["procurement_db"]
    rooms = await db["rooms"].find({"project": "69a616af4d6ec36cfb42cbf2"}).to_list(None)
    for r in rooms:
        print(r)

asyncio.run(run())
