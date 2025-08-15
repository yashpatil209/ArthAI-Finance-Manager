package com.Finance.Backend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.Candidate;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.api.HarmCategory;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.api.SafetySetting;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class GeminiAIService {

    @Value("${gcp.project-id}")
    private String projectId;

    @Value("${gcp.location}")
    private String location;

    @Value("${gcp.model-name}")
    private String modelName;

    public String receiptScanner(MultipartFile file) {
       System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", "com/Finance/Backend/Credential.json");

        StringBuilder responseBuilder = new StringBuilder();

        try (VertexAI vertexAi = new VertexAI(projectId, location);) {
            GenerationConfig generationConfig = GenerationConfig.newBuilder()
                    .setMaxOutputTokens(8192)
                    .setTemperature(1F)
                    .setTopP(0.95F)
                    .build();

            List<SafetySetting> safetySettings = Arrays.asList(
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build());

            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName(modelName)
                    .setVertexAi(vertexAi)
                    .setGenerationConfig(generationConfig)
                    .setSafetySettings(safetySettings)
                    .build();

            // Convert the MultipartFile to byte[]
            byte[] imageBytes = file.getBytes();

            // Create PartMaker from image bytes
            var image = PartMaker.fromMimeTypeAndData(file.getContentType(), imageBytes);

            String prompt = "Analyze this receipt image and extract the following information in JSON format:\n" +
                    "  - Total amount (just the number, no currency symbol)\n" +
                    "  - Date (in ISO 8601 date format: \"YYYY-MM-DD\")\n" +
                    "  - Description or items purchased (short summary of about bill)\n" +
                    "  - Merchant/store name (if identifiable)\n" +
                    "  - Suggested category (choose one from: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense)\n" +
                    "\n" +
                    "Only respond with valid JSON in this exact format:\n" +
                    "\n" +
                    "{\n" +
                    "  \"amount\": number,\n" +
                    "  \"date\": \"ISO date string\",\n" +
                    "  \"description\": \"string\",\n" +
                    "  \"category\": \"string\"\n" +
                    "}\n" +
                    "\n" +
                    "If it's not a receipt or the required fields cannot be extracted, return an empty object:\n" +
                    "{}";

            // Generate content using VertexAI
            var content = ContentMaker.fromMultiModalData(image, prompt);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            // Do something with the response
            responseStream.stream().forEach(System.out::println);

            for (GenerateContentResponse response : responseStream) {
                for (Candidate candidate : response.getCandidatesList()) {
                    for (Part part : candidate.getContent().getPartsList()) {
                        String text = part.getText();
                        responseBuilder.append(text).append("\n");
                    }
                }
            }

        } catch (IOException e) {
            return "Error processing the request: " + e.getMessage();
        }

        return responseBuilder.toString();

    }


    public String processPrompt(String prompt) {
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", "com/Finance/Backend/Credential.json");

        prompt += " If the input is not related to finance,money, and money management respond with 'Please ask finance-related questions only.'";
        StringBuilder responseBuilder = new StringBuilder();

        try (VertexAI vertexAi = new VertexAI(projectId, location)) {
            // Generation configuration
            GenerationConfig generationConfig = GenerationConfig.newBuilder()
                    .setMaxOutputTokens(8192)
                    .setTemperature(1F)
                    .setTopP(0.95F)
                    .build();

            // Safety settings
            List<SafetySetting> safetySettings = Arrays.asList(
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build(),
                    SafetySetting.newBuilder()
                            .setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)
                            .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE)
                            .build()
            );

            // Initialize the Generative Model
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName(modelName)
                    .setVertexAi(vertexAi)
                    .setGenerationConfig(generationConfig)
                    .setSafetySettings(safetySettings)
                    .build();

            // Corrected method to create content from text
            var content = ContentMaker.fromString(prompt);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            // Process the AI-generated response
            for (GenerateContentResponse response : responseStream) {
                for (Candidate candidate : response.getCandidatesList()) {
                    for (Part part : candidate.getContent().getPartsList()) {
                        responseBuilder.append(part.getText()).append("\n");
                    }
                }
            }

        } catch (IOException e) {
            return "{ \"error\": \"Error processing the request: " + e.getMessage() + "\" }";
        }

        String response = responseBuilder.toString();
        response = response.replace("*", "").replace("**", "");
        
        return response;

    }


}
