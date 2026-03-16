from pymongo import MongoClient

def main():
    client = MongoClient("mongodb+srv://admin:FOtOa1rkCqNhajw9@cluster0.mjg9g7g.mongodb.net/?appName=Cluster0")
    db = client["procurement_db"]
    
    # We found `masks_polygons_url` is None on the rooms assigned to project 69a616af4d6ec36cfb42cbf2.
    # What project is 69a764888de4c637afe6f662 associated with?
    room = db.rooms.find_one({"_id": "69a764888de4c637afe6f662"})
    print("Room search by _id string:", room)
    
    from bson import ObjectId
    room2 = db.rooms.find_one({"_id": ObjectId("69a764888de4c637afe6f662")})
    print("Room search by ObjectId:", room2)

if __name__ == "__main__":
    main()
