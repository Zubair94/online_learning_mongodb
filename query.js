// basic CRUD Operations

// GET /
db.users.find();
db.users.find({ gender: "male" })

// GET /:id
db.users.find({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") });
db.users.findOne({ gender: "male" });

// POST
db.users.insertOne({
    "_id": "5e8c6d0b19035043b84e8bdc",
    "first_name": "Webster",
    "last_name": "Prosacco",
    "email": "Tristin_Block88@yahoo.com",
    "mobile": "(357) 636-1846",
    "password": "4kZPKUcz6kEUAP0",
    "age": 66,
    "gender": "female",
    "auth_level": "teacher",
    "location": "27758 Roselyn Ville",
    "institute_name": "Hackett and Sons",
    "institute_type": "others",
    "short_bio": "Fugit dolorum dolorem quod velit nulla quasi ducimus consequatur.\nAb et sint quis voluptatibus similique nostrum est.\nAd itaque consequatur.",
    "bio": "Cum asperiores rem quo neque fuga ipsa.\nNon nisi quo molestias possimus in.\nEt asperiores dolores commodi eius id aspernatur ipsa.\nNihil odit eum non perferendis et tempore modi nisi.",
    "image": "http://lorempixel.com/640/480",
    "verified": true,
    "courses_enrolled": [],
    "courses_taught": [],
    "created_at": "2020-04-06T16:42:06.722Z",
    "updated_at": "2020-04-07T11:44:20.232Z"
});
db.users.insertMany([document]); // array of document is one of the schemas in the schema folder

// PATCH /:id
db.users.updateOne({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") }, { $unset: "gender" });
db.users.findOneAndUpdate();

// PUT /:id
db.users.replaceOne({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") }, {
    "_id": "5e8c6d0b19035043b84e8bdc",
    "first_name": "Webster",
    "last_name": "Prosacco",
    "email": "Tristin_Block88@yahoo.com",
    "mobile": "(357) 636-1846",
    "password": "4kZPKUcz6kEUAP0",
    "age": 66,
    "gender": "female",
    "auth_level": "teacher",
    "location": "27758 Roselyn Ville",
    "institute_name": "Hackett and Sons",
    "institute_type": "others",
    "short_bio": "Fugit dolorum dolorem quod velit nulla quasi ducimus consequatur.\nAb et sint quis voluptatibus similique nostrum est.\nAd itaque consequatur.",
    "bio": "Cum asperiores rem quo neque fuga ipsa.\nNon nisi quo molestias possimus in.\nEt asperiores dolores commodi eius id aspernatur ipsa.\nNihil odit eum non perferendis et tempore modi nisi.",
    "image": "http://lorempixel.com/640/480",
    "verified": true,
    "courses_enrolled": [],
    "courses_taught": [],
    "created_at": "2020-04-06T16:42:06.722Z",
    "updated_at": "2020-04-07T11:44:20.232Z"
});
db.users.findOneAndReplace(); // works similary with different writeconcern

// PATCH /[:id]
db.users.updateMany({ verfied: false }, { $set: { verfied: true }});

// DELETE /:id
db.users.deleteOne({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") });
db.users.remove({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") });

// DELETE /[:id]
db.users.deleteMany({gender: "male"});

// Pagination
db.users.find().skip(0).limit(10);
db.users.find().skip(10).limit(10);

// Sorting
db.users.find().sort({ created_at: -1 }); // Descending 
db.users.find().sort({ created_at: 1 }); // Ascending
db.assessments.find().sort({ score: -1 }); // Descending 
db.assessments.find().sort({ score: 1 }); // Ascending

// Searching

// Enroll Student to Course
db.users.updateOne({ _id: ObjectId("5e8c6d0b19035043b84e8bdc") }, { $push: { 
    courses_enrolled: { 
        course: ObjectId("5e92f1d1a92f1031941df03c"),
        enrolled_on: '2020-04-12T12:42:17.807Z'
    }
}});

// Assign Teacher To Course
db.users.updateOne({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") }, { $push: { courses_taught: ObjectId("5e92f1d1a92f1031941df03c") }});

// To Revert the Above Operation
db.users.updateOne({ _id: ObjectId("5e8c6d0b19035043b84e8bd1") }, { $pull: { courses_taught: ObjectId("5e92f1d1a92f1031941df03c") }});

// Total No of Users
db.users.count();

// Total No of Users Enrolled to any Course
db.users.find({"courses_enrolled.0": { $exists: true }});

// Total No of Users Not Enrolled to any Course
db.users.count({"courses_enrolled.0": { $exists: false }});

// Populate Collection From ObjectId References
db.users.aggregate([
    { 
        $match: { _id: ObjectId("5e8c6d0b19035043b84e8bdc") }
    },
    {
        $lookup: {
            from: "courses",
            localField: "courses_enrolled.course",
            foreignField: "_id",
            as: "courses"
         }
    }
]);

db.users.aggregate([
    { 
        $match: { _id: ObjectId('5e8c6d0b19035043b84e8bdc') }
    },
    {
        $lookup: {
            from: 'courses',
            let: {courseId: '$courses_enrolled.course'},
            pipeline: [
                {$match: { 
                    $expr: {
                        $in: ['$_id', '$$courseId']
                    }
                }}
            ],
            as: 'courses'
        }
    }
]);


db.users.aggregate([
    {
        $project: { _id: 1, first_name: 1, last_name: 1}
    }
]);

// Average Score of assessments of all users in a Course
db.assessments.aggregate([
    { 
        $group: { _id : null, averageScore : { $avg: "$score" } } 
    }
]);

// Total no Video Views of all users in a Course
db.videoviews.aggregate([
    { 
        $group: { _id : null, totalViews : { $sum: "$view_count" } } 
    }
]);

// Users who rated 5 for reviews
db.reviews.aggregate([
    {
        $match: { rating: 5 }
    },
    {
        $project: {_id: 1, user_id: 1, rating: 1}
    },
    {
        $lookup: {
            from: 'users',
            let: {user_id: '$user_id'},
            pipeline: [
                {
                    $match: { 
                        $expr: {
                            $and: [
                                { $eq: ['$_id', '$$user_id'] },
                            ]
                        }
                    }
                }
            ],
            as: 'user'
        }
    }
]);
