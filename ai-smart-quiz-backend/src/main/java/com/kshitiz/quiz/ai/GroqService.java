package com.kshitiz.quiz.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GroqService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${groq.api.key}")
    private String apiKey;

    public GroqService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.objectMapper = new ObjectMapper();
    }

    public String generateQuestions(String topic,
                                    String difficulty,
                                    Integer numberOfQuestions) {

        try {

            String prompt = """
Generate %d multiple choice questions.

Topic: %s

Difficulty: %s

Return ONLY valid JSON.

Format:

[
  {
    "question":"",
    "optionA":"",
    "optionB":"",
    "optionC":"",
    "optionD":"",
    "correctAnswer":"A"
  }
]

Do not return markdown.
Do not use ```json.
Return only the JSON array.
"""
                    .formatted(numberOfQuestions, topic, difficulty);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            String escapedPrompt = prompt
                    .replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n");

            String requestBody = """
{
  "model":"llama-3.1-8b-instant",
  "messages":[
    {
      "role":"user",
      "content":"%s"
    }
  ]
}
""".formatted(escapedPrompt);

            HttpEntity<String> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            "https://api.groq.com/openai/v1/chat/completions",
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            JsonNode root = objectMapper.readTree(response.getBody());

            return root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error : " + e.getMessage();
        }

    }

}