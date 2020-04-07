const faker = require('faker');
const fs = require('fs');
const mongodb = require('mongodb');

const courses_id_stream = ['5e92f1d1a92f1031941df03c', '5e92f1d1a92f1031941df042'];
const users_id_stream = [
    '5e8c6d0b19035043b84e8bd1',
    '5e8c6d0b19035043b84e8bd2',
    '5e8c6d0b19035043b84e8bd3',
    '5e8c6d0b19035043b84e8bd4',
    '5e8c6d0b19035043b84e8bd5',
    '5e8c6d0b19035043b84e8bd6',
    '5e8c6d0b19035043b84e8bd7',
    '5e8c6d0b19035043b84e8bd8',
    '5e8c6d0b19035043b84e8bd9',
    '5e8c6d0b19035043b84e8bda',
    '5e8c6d0b19035043b84e8bdb',
    '5e8c6d0b19035043b84e8bdc'
];

const users_answer_stream = [
    [
        {
            "question": "Molestiae minus voluptatem.",
            "user_answer": "ut eos voluptatum iste",
            "answer": "ut id accusantium est"
        },
        {
            "question": "Ipsam incidunt rerum inventore aut quaerat eum enim quas est.",
            "user_answer": "ut eos voluptatum iste",
            "answer": "esse inventore velit sint"
        },
        {
            "question": "Expedita ut molestiae.\nEt ut autem voluptatibus placeat est id.",
            "user_answer": "dolor dolores eligendi es",
            "answer": "dolor dolores eligendi est"
        },
        {
            "question": "Tenetur officiis voluptate ex.\nOptio praesentium cumque eos aut quis nesciunt omnis nam.\nOdit molestiae doloremque temporibus quibusdam fuga ex.\nEa a occaecati unde occaecati assumenda.\nOmnis eius ducimus amet.",
            "user_answer": "dolor dolores eligendi es",
            "answer": "aspernatur dolor in nisi"
        },
        {
            "question": "Qui eum hic distinctio praesentium.\nAt eveniet dolore provident rerum consequuntur doloribus dolores vitae eos.\nVoluptatibus non quia quia.\nNisi et sunt aliquam id.",
            "user_answer": "vel mollitia nostrum vitae",
            "answer": "vel mollitia nostrum vitae"
        }
    ],
    [
        {
            "question": "Exercitationem unde et necessitatibus et error.",
            "user_answer": "tenetur sunt ut sunt",
            "answer": "tenetur sunt ut sunt"
        },
        {
            "question": "Voluptates ducimus beatae totam itaque nihil.\nUt numquam numquam corrupti est ab vero dolorem.",
            "user_answer": "tenetur sunt ut sunt",
            "answer": "soluta necessitatibus doloribus quis"
        },
        {
            "question": "Dolorem ut a.\nDeleniti voluptatem rem sit facilis omnis dolores eos repudiandae dolorum.\nRem omnis et culpa libero sequi blanditiis similique nisi voluptas.\nEnim et consectetur harum qui rerum quia.\nCupiditate incidunt rerum eius dolore.",
            "user_answer": "dolore et totam impedit",
            "answer": "dolore et totam impedit"
        },
        {
            "user_answer": "tenetur sunt ut sunt",
            "user_answer": "iusto ex ducimus nulla",
            "answer": "iusto ex ducimus nulla"
        },
        {
            "question": "Amet non quod et consectetur occaecati ex.",
            "user_answer": "corrupti deserunt aliquid natus",
            "answer": "cupiditate id at nostrum"
        }
    ]
]

let user = JSON.parse(fs.readFileSync('schemas/user.json', 'utf8'));
let course = JSON.parse(fs.readFileSync('schemas/course.json', 'utf8'));
let review = JSON.parse(fs.readFileSync('schemas/review.json', 'utf8'));
let assessment = JSON.parse(fs.readFileSync('schemas/assessment.json', 'utf8')); 
let videoview = JSON.parse(fs.readFileSync('schemas/videoview.json', 'utf8'));

function generateUser() {
    return  {
        _id: new mongodb.ObjectID(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        mobile: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        age: faker.random.number(100),
        gender: faker.random.arrayElement(['male', 'female']),
        auth_level: faker.random.arrayElement(['user', 'teacher']),
        location: faker.address.streetAddress(),
        institute_name: faker.company.companyName(),
        institute_type: faker.random.arrayElement(['school', 'university', 'college', 'others']),
        short_bio: faker.lorem.lines(),
        bio: faker.lorem.lines(),
        image: faker.image.imageUrl(),
        verified: faker.random.boolean(),
        courses_enrolled: [],
        courses_taught: [],
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
    };
}
function generateCourse() {
    return {
        _id: new mongodb.ObjectID(),
        title: faker.name.title(),
        slug: faker.lorem.slug(),
        metadata: { 
            section_count: 2, 
            sections: [ 
                {
                    lecture_count: 2 
                },
                {
                    lecture_count: 1 
                }
            ] 
        },
        short_description: faker.lorem.lines(),
        description: faker.lorem.paragraph(),
        preview_video: faker.internet.url(),
        preview_video_thumbnail: faker.internet.url(),
        images: [ 
            { 
                link: faker.internet.url(), 
                sort_order: 1 
            },
            { 
                link: faker.internet.url(), 
                sort_order: 2 
            },
            { 
                link: faker.internet.url(), 
                sort_order: 3 
            } 
        ],
        price: faker.commerce.price(),
        duration: 2930,
        featured: true,
        sections: [
          {
            _id: new mongodb.ObjectID(),
            section_id: 1,
            slug: faker.lorem.slug(),
            title: faker.name.title(),
            description: faker.lorem.paragraph(),
            duration: 1800,
            sort_order: 1,
            lectures: [
                {
                    _id: new mongodb.ObjectID(),
                    "lecture_id": 1,
                    "slug": faker.lorem.slug(),
                    "title": faker.name.title(),
                    "description": faker.lorem.paragraph(),
                    "duration": 950,
                    "video": faker.internet.url(),
                    "video_thumbnail": faker.internet.url(),
                    "sort_order": 1
                },
                {
                    _id: new mongodb.ObjectID(),
                    "lecture_id": 1,
                    "slug": faker.lorem.slug(),
                    "title": faker.name.title(),
                    "description": faker.lorem.paragraph(),
                    "duration": 950,
                    "video": faker.internet.url(),
                    "video_thumbnail": faker.internet.url(),
                    "sort_order": 2
                }
            ]
          },
          {
            _id: new mongodb.ObjectID(),
            section_id: 2,
            slug: faker.lorem.slug(),
            title: faker.name.title(),
            description: faker.lorem.paragraph(),
            duration: 1130,
            sort_order: 1,
            lectures: [
                {
                    _id: new mongodb.ObjectID(),
                    "lecture_id": 1,
                    "slug": faker.lorem.slug(),
                    "title": faker.name.title(),
                    "description": faker.lorem.paragraph(),
                    "duration": 850,
                    "video": faker.internet.url(),
                    "video_thumbnail": faker.internet.url(),
                    "sort_order": 1
                }
            ]
          }
        ],
        assessment: [ 
            { 
                question: faker.lorem.lines(), 
                options: [
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4)
                ], 
                answer: faker.lorem.words(4)
            },
            { 
                question: faker.lorem.lines(), 
                options: [
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4)
                ], 
                answer: faker.lorem.words(4)
            },
            { 
                question: faker.lorem.lines(), 
                options: [
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4)
                ], 
                answer: faker.lorem.words(4)
            },
            { 
                question: faker.lorem.lines(), 
                options: [
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4)
                ], 
                answer: faker.lorem.words(4)
            },
            { 
                question: faker.lorem.lines(), 
                options: [
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4),
                    faker.lorem.words(4)
                ], 
                answer: faker.lorem.words(4)
            } 
        ],
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
    }
}

function generateReview() {
    return {
        _id: new mongodb.ObjectID(),
        rating_text: faker.lorem.lines(),
        rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
        course_id: faker.random.arrayElement(courses_id_stream),
        user_id: faker.random.arrayElement(users_id_stream),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
    }
}

function generateVideoView() {
    return {
        _id: new mongodb.ObjectID(),
        completed: faker.random.boolean(),
        completedPercent: faker.random.number(100),
        view_count: faker.random.number(3000),
        section_id: faker.random.arrayElement([1, 2]),
        lecture_id: faker.random.arrayElement([1, 2]),
        course_id: faker.random.arrayElement(courses_id_stream),
        user_id: faker.random.arrayElement(users_id_stream),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
    }
}

function generateAssessment() {
    return {
        _id: new mongodb.ObjectID(),
        score: faker.random.number(5),
        user_answers: faker.random.arrayElement(users_answer_stream),
        course_id: faker.random.arrayElement(courses_id_stream),
        user_id: faker.random.arrayElement(users_id_stream),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
    }
}

function generateFakeData(times, fakeModel, fileName) {
    let array = [];
    for(let i = 0; i < times; i++) {
        array.push(fakeModel());
    }
    fs.writeFileSync(`${'data/'}${fileName}`, JSON.stringify(array, null, 2));
    return array;
}

// generateFakeData(10, generateUser, 'userdata.json')
// generateFakeData(2, generateCourse, 'coursedata.json')
// generateFakeData(30, generateAssessment, 'assessmentdata.json');
// generateFakeData(25, generateReview, 'reviewdata.json');
// generateFakeData(5, generateVideoView, 'videoviewdata.json');

/**
 * Database Insert Script
 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://user:user@localhost:27017/online-learning';

// Database Name
const dbName = 'online-learning';

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

const insertDocuments = function(db, callback) {
    const collectionArray = JSON.parse(fs.readFileSync('data/assessmentdata.json', 'utf8'));
    const collectionName = 'assessments';
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany(collectionArray, function(err, result) {
      console.log("Inserted documents into the collection");
      callback(result);
    });
};

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  insertDocuments(db, function() {
    client.close();
  });
});
