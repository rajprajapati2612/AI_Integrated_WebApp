import axios from "axios";


const api = axios.create({
    baseURL:"https://ai-resume-analyzer-backend-67qa.onrender.com",
    withCredentials:true,
})



export const generateInterviewReport =  async ({jobDescription, selfDescription, resumeFile})=>{
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription",selfDescription);
    formData.append("resume",resumeFile);

    console.log("hello from the generateInterviewReport ");
    console.log("jobDescription", jobDescription);
    console.log("selfDescription", selfDescription);

    const response = await api.post('/api/interview', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    console.log("response ",response);

    return response.data;

}



export const getInterviewReportById = async (interviewid)=>{
   
    const response =  await api.get(`/api/interview/report/${interviewid}`)

    return response.data
}



export const getAllInterviewReports = async ()=>{
    console.log("hello");
    const response  = await api.get("/api/interview/")
    console.log("inside getAllInterviewReports ", response);

    return response.data
}


export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}
