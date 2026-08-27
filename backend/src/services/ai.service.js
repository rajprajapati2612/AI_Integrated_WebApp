// const {GoogleGenAI} = require("@google/genai");
// const z = require("zod");
// const {zodToJsonSchema} = require("zod-to-json-schema");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });


// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


//     const prompt = `Generate an interview report for a candidate with the following details:
//                         Resume: ${resume}
//                      SelfDescription: ${selfDescription}
//                      JobDescription: ${jobDescription}
//  Candidate is applying for the job. JobDescription tells about the job and profile. Candidate is providing his Resume and SelfDescription. Acoording to the 
//  given details please generate possible   type of questions can be asked to him with intention and answer . I am providing the proper format. Remember do not return empty anything generate all fields with proper analysing and  understanding.providing  the examples also.

//  technicalQuestions MUST be an array of objects.Each object MUST have exactly these 3 fields: {
//    "question": "string", 
//      "intention": "string",
//   "answer": "string"
//  } example:
//    "technicalQuestions": [
//    {
//      "question": "What is the difference between authentication and authorization?",   
//        "intention": "To evaluate the candidate's understanding of application security.",   
//          "answer": "Explain that authentication verifies identity while authorization determines what an authenticated user can access."
//   },{"question":"What is Nodejs?",
//      "intention":"To check the knowldge and understanding of candidate for nodejs",
//      "answer":"Node.js is a JavaScript runtime that lets you run JavaScript outside a web browser, especially on servers."
//   },{....},
  
//   ........
// ]  in this format.Remember one thing return the array of objects like shown in the above example. similarly for the behavioralQuestions. and 
//   SKILL GAPS:

//  skillGaps MUST be an array of objects.

//  Each object MUST have:

// {
//    "skill": "string",
//    "severity": "low"
//  }

//  severity can ONLY be:
//  "low"
//  "medium"
//  "high"

// Example:

// "skillGaps": [
//   {
//     "skill": "System Design",     "severity": "medium"
//   },......
// ]


// PREPARATION PLAN:

// preparationPlan MUST be an array of objects.

// Each object MUST have:

// {
//   "day": 1,
//   "focus": "string",
//   "tasks": ["string", "string"]
// }

// Example:

// "preparationPlan": [
//   {
//     "day": 1,
//     "focus": "JavaScript fundamentals",
//     "tasks": [
//       "Revise closures",
//       "Revise promises",
//       "Practice JavaScript interview questions"
//     ]
//   },.....
// ]
//   and 

//   MATCH SCORE:

// matchScore MUST be a number between 0 and 100.

// TITLE:

// title MUST be a string representing the job title.

//  `


// // // const prompt = `
// // // You are an expert technical interviewer.

// // // Analyze the following candidate information.

// // // RESUME:
// // // ${resume}

// // // SELF DESCRIPTION:
// // // ${selfDescription}

// // // JOB DESCRIPTION:
// // // ${jobDescription}

// // // Generate an interview preparation report.

// // // IMPORTANT:
// // // You MUST follow the provided JSON schema exactly.

// // // Do NOT simplify arrays into strings.

// // // TECHNICAL QUESTIONS:

// // // technicalQuestions MUST be an array of objects.

// // // Each object MUST have exactly these 3 fields:

// // // {
// //    "question": "string", 
// //      "intention": "string",
// //   "answer": "string"
// //  }

// // // Example:
// //  "technicalQuestions": [
// //    {
// //      "question": "What is the difference between authentication and authorization?",     "intention": "To evaluate the candidate's understanding of application security.",     "answer": "Explain that authentication verifies identity while authorization determines what an authenticated user can access."
// //   }
// // ]



// // // Do NOT generate this:

// // // "technicalQuestions": [
// // //   "What is authentication?",
// // //   "What is authorization?"
// // // ]

// // // Instead generate objects with question, intention and answer.

// // // BEHAVIORAL QUESTIONS:

// // // behavioralQuestions MUST also be an array of objects.

// // // Each object MUST have:

// // // {
// // //   "question": "string",
// // //   "intention": "string",
// // //   "answer": "string"
// // // }

// // // Example:

// // // "behavioralQuestions": [
// // //   {
// // //     "question": "Tell me about a difficult project you worked on.",
// // //     "intention": "To evaluate problem-solving and teamwork.",
// // //     "answer": "Use the STAR method. Explain the situation, your responsibility, actions you took, and the final result."
// // //   }
// // // ]

// //  SKILL GAPS:

// //  skillGaps MUST be an array of objects.

// //  Each object MUST have:

// // {
// //    "skill": "string",
// //    "severity": "low"
// //  }

// //  severity can ONLY be:
// //  "low"
// //  "medium"
// //  "high"

// // Example:

// // "skillGaps": [
// //   {
// //     "skill": "System Design",     "severity": "medium"
// //   }
// // ]

// // PREPARATION PLAN:

// // preparationPlan MUST be an array of objects.

// // Each object MUST have:

// // {
// //   "day": 1,
// //   "focus": "string",
// //   "tasks": ["string", "string"]
// // }

// // Example:

// // "preparationPlan": [
// //   {
// //     "day": 1,
// //     "focus": "JavaScript fundamentals",
// //     "tasks": [
// //       "Revise closures",
// //       "Revise promises",
// //       "Practice JavaScript interview questions"
// //     ]
// //   }
// // ]

// // MATCH SCORE:

// // matchScore MUST be a number between 0 and 100.

// // TITLE:

// // title MUST be a string representing the job title.

// // // FINAL RULES:

// // // - Follow the JSON schema exactly.
// // // - Do not return arrays of strings.
// // // - technicalQuestions must contain objects.
// // // - behavioralQuestions must contain objects.
// // // - skillGaps must contain objects.
// // // - preparationPlan must contain objects.
// // // - Return ONLY valid JSON.
// // // `;

//     const response = await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     })

//     console.log(JSON.parse(response.text));

//     return JSON.parse(response.text);


// }




// module.exports = generateInterviewReport







const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

const interviewReportJsonSchema = {
    type: "object",

    properties: {

        title: {
            type: "string"
        },

        matchScore: {
            type: "number"
        },

        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string"
                    },
                    intention: {
                        type: "string"
                    },
                    answer: {
                        type: "string"
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: {
                        type: "string"
                    },
                    intention: {
                        type: "string"
                    },
                    answer: {
                        type: "string"
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: {
                        type: "string"
                    },
                    severity: {
                        type: "string",
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ]
                    }
                },
                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "integer"
                    },
                    focus: {
                        type: "string"
                    },
                    tasks: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                },
                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        }

    },

    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
          //  responseSchema: zodToJsonSchema(interviewReportSchema),
          responseSchema: interviewReportJsonSchema,
        }
    })
    console.log(JSON.parse(response.text));

    return JSON.parse(response.text)


}



// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-3-flash-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })


//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

//     return pdfBuffer

// }

module.exports = {generateInterviewReport}















// const { OpenRouter } = require("@openrouter/sdk");

// const client = new OpenRouter({
//     apiKey: process.env.OPENROUTER_API_KEY,
//     // Optional:
//     // httpReferer: "https://yourwebsite.com",
//     // appTitle: "Your App Name",
// });


// const interviewReportJsonSchema = {
//     type: "object",

//     properties: {

//         title: {
//             type: "string"
//         },

//         matchScore: {
//             type: "number"
//         },

//         technicalQuestions: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: {
//                         type: "string"
//                     },
//                     intention: {
//                         type: "string"
//                     },
//                     answer: {
//                         type: "string"
//                     }
//                 },
//                 required: [
//                     "question",
//                     "intention",
//                     "answer"
//                 ],
//                 additionalProperties: false
//             }
//         },

//         behavioralQuestions: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     question: {
//                         type: "string"
//                     },
//                     intention: {
//                         type: "string"
//                     },
//                     answer: {
//                         type: "string"
//                     }
//                 },
//                 required: [
//                     "question",
//                     "intention",
//                     "answer"
//                 ],
//                 additionalProperties: false
//             }
//         },

//         skillGaps: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     skill: {
//                         type: "string"
//                     },
//                     severity: {
//                         type: "string",
//                         enum: [
//                             "low",
//                             "medium",
//                             "high"
//                         ]
//                     }
//                 },
//                 required: [
//                     "skill",
//                     "severity"
//                 ],
//                 additionalProperties: false
//             }
//         },

//         preparationPlan: {
//             type: "array",
//             items: {
//                 type: "object",
//                 properties: {
//                     day: {
//                         type: "integer"
//                     },
//                     focus: {
//                         type: "string"
//                     },
//                     tasks: {
//                         type: "array",
//                         items: {
//                             type: "string"
//                         }
//                     }
//                 },
//                 required: [
//                     "day",
//                     "focus",
//                     "tasks"
//                 ],
//                 additionalProperties: false
//             }
//         }
//     },

//     required: [
//         "title",
//         "matchScore",
//         "technicalQuestions",
//         "behavioralQuestions",
//         "skillGaps",
//         "preparationPlan"
//     ],

//     additionalProperties: false
// };


// const response = await client.chat.send({
//     chatRequest: {
//         model: "openrouter/free",

//         messages: [
//             {
//                 role: "user",
//                 content: prompt
//             }
//         ],

//         max_tokens: 2000,

//         response_format: {
//             type: "json_schema",
//             json_schema: {
//                 name: "interview_report",
//                 strict: true,
//                 schema: interviewReportJsonSchema
//             }
//         }
//     }
// });
// module.exports = {
//     generateInterviewReport
// };