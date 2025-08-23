package com.Finance.Backend.Service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.Candidate;
import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.api.HarmCategory;
import com.google.cloud.vertexai.api.Part;
import com.google.cloud.vertexai.api.SafetySetting;
import com.google.cloud.vertexai.api.SafetySetting.HarmBlockThreshold;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GeminiAIService {
    @Value("${gcp.project-id}")
    private String projectId;
    @Value("${gcp.location}")
    private String location;
    @Value("${gcp.model-name}")
    private String modelName;

    public GeminiAIService() {
    }

    public String receiptScanner(MultipartFile file) {
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", "com/Finance/Backend/Credential.json");
        StringBuilder responseBuilder = new StringBuilder();

        try {
            VertexAI vertexAi = new VertexAI(this.projectId, this.location);

            try {
                GenerationConfig generationConfig = GenerationConfig.newBuilder().setMaxOutputTokens(8192).setTemperature(1.0F).setTopP(0.95F).build();
                List<SafetySetting> safetySettings = Arrays.asList(SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build());
                GenerativeModel model = (new GenerativeModel.Builder()).setModelName(this.modelName).setVertexAi(vertexAi).setGenerationConfig(generationConfig).setSafetySettings(safetySettings).build();
                byte[] imageBytes = file.getBytes();
                Part image = PartMaker.fromMimeTypeAndData(file.getContentType(), imageBytes);
                String prompt = "Analyze this receipt image and extract the following information in JSON format:\n  - Total amount (just the number, no currency symbol)\n  - Date (in ISO 8601 date format: \"YYYY-MM-DD\")\n  - Description or items purchased (short summary of about bill)\n  - Merchant/store name (if identifiable)\n  - Suggested category (choose one from: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense)\n\nOnly respond with valid JSON in this exact format:\n\n{\n  \"amount\": number,\n  \"date\": \"ISO date string\",\n  \"description\": \"string\",\n  \"category\": \"string\"\n}\n\nIf it's not a receipt or the required fields cannot be extracted, return an empty object:\n{}";
                Content content = ContentMaker.fromMultiModalData(new Object[]{image, prompt});
                ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);
                Stream var10000 = responseStream.stream();
                PrintStream var10001 = System.out;
                Objects.requireNonNull(var10001);
                var10000.forEach(var10001::println);
                Iterator var12 = responseStream.iterator();

                while(var12.hasNext()) {
                    GenerateContentResponse response = (GenerateContentResponse)var12.next();
                    Iterator var14 = response.getCandidatesList().iterator();

                    while(var14.hasNext()) {
                        Candidate candidate = (Candidate)var14.next();
                        Iterator var16 = candidate.getContent().getPartsList().iterator();

                        while(var16.hasNext()) {
                            Part part = (Part)var16.next();
                            String text = part.getText();
                            responseBuilder.append(text).append("\n");
                        }
                    }
                }
            } catch (Throwable var20) {
                try {
                    vertexAi.close();
                } catch (Throwable var19) {
                    var20.addSuppressed(var19);
                }

                throw var20;
            }

            vertexAi.close();
        } catch (IOException var21) {
            return "Error processing the request: " + var21.getMessage();
        }

        return responseBuilder.toString();
    }

    public String processPrompt(String prompt) {
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", "com/Finance/Backend/Credential.json");
        prompt = prompt + " If the input is not related to finance,money, and money management respond with 'Please ask finance-related questions only.'";
        StringBuilder responseBuilder = new StringBuilder();

        try {
            VertexAI vertexAi = new VertexAI(this.projectId, this.location);

            try {
                GenerationConfig generationConfig = GenerationConfig.newBuilder().setMaxOutputTokens(8192).setTemperature(1.0F).setTopP(0.95F).build();
                List<SafetySetting> safetySettings = Arrays.asList(SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build(), SafetySetting.newBuilder().setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT).setThreshold(HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE).build());
                GenerativeModel model = (new GenerativeModel.Builder()).setModelName(this.modelName).setVertexAi(vertexAi).setGenerationConfig(generationConfig).setSafetySettings(safetySettings).build();
                Content content = ContentMaker.fromString(prompt);
                ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);
                Iterator var9 = responseStream.iterator();

                while(var9.hasNext()) {
                    GenerateContentResponse response = (GenerateContentResponse)var9.next();
                    Iterator var11 = response.getCandidatesList().iterator();

                    while(var11.hasNext()) {
                        Candidate candidate = (Candidate)var11.next();
                        Iterator var13 = candidate.getContent().getPartsList().iterator();

                        while(var13.hasNext()) {
                            Part part = (Part)var13.next();
                            responseBuilder.append(part.getText()).append("\n");
                        }
                    }
                }
            } catch (Throwable var16) {
                try {
                    vertexAi.close();
                } catch (Throwable var15) {
                    var16.addSuppressed(var15);
                }

                throw var16;
            }

            vertexAi.close();
        } catch (IOException var17) {
            return "{ \"error\": \"Error processing the request: " + var17.getMessage() + "\" }";
        }

        String response = responseBuilder.toString();
        response = response.replace("*", "").replace("**", "");
        return response;
    }
}

