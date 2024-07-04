const { json } = require("body-parser");
const OpenAI = require("openai");
const Product = require("../../../../models/product");

const openai = new OpenAI({
  apiKey:process.env.SECRET_CHAT_GPT 
});


module.exports.generateDescription=async(req,res,next)=>{
    const image = req.file.buffer.toString('base64');  //converting the buffere image to base64 to use in gpt
    const product=await Product.findById(req.body.productId)

    var keys = product.key;
    var userKey=req.body.userKey;
    var prompt = `I have an image of a product, and I need a description in JSON format. Below are the keys "|${keys}|" should also  have a key "About ITEM" and "About ITEM" should be object  which should   have answer in "point wise" Important like " '1':'nice product easy to use'  " with keys shoulb be atleast have 7 points || 
    Product Description : construct the answers considering these point ${userKey} also include ${req.body.description}` ;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:'  You are a helpful assistant designed to analyze images and generate a JSON output. When provided with an image and a prompt containing keywords, you will create a JSON object with the specified keys and values. Use the image and the given product information to construct detailed descriptions for the relevant keys, such as product name, model ID, etc. Your output should include  the keys specified in the prompt'
            // "You are a helpful assistant designed to read image and give the description based on image and prompt wich includes keyword  to you AS  JSON output ",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${prompt}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
      stream: true,
    });
    console.log("Response form ChatGpt",chatCompletion)

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
  
    var fullResponse = "";
  
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
      const chunks=chunk.choices[0]?.delta?.content || ""
      res.write(chunks)
        fullResponse+=chunk.choices[0]?.delta?.content || ""
  
    }
    res.end()
}






module.exports.generate=async(req,res,next)=>{


  console.log("First Gpt setup",req.body);
    const image = req.file.buffer.toString('base64');  //converting the buffere image to base64 to use in gpt
    var keys = req.body.key;
    var description = req.body.description ? req.body.description : "";
    var prompt = `I have an image of a product, and I need a description in JSON format. Below are the keys "|${keys}|" should also  have a key "About ITEM" and "About ITEM" should be object  which should have answer in point with keys shoulb be atleast have 7 points || construct the answers considering these point ${
      description.length == 0 ? "" : description
    }`;
    // provide json with above keys no other data
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to read image and give the description based on image and prompt wich includes keyword  to you AS  JSON output ",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${prompt}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      model: "gpt-4o",
      response_format: { type: "json_object" },
      stream: true,
    });
  
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
  
    var fullResponse = "";
  
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
      const chunks=chunk.choices[0]?.delta?.content || ""
      res.write(chunks)
        // fullResponse+=chunk.choices[0]?.delta?.content || ""
  
    }
    res.end()
    res.status(200).json({
        message:"hit the generate route"
    })
}