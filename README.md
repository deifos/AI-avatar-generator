# AI Influencer generator

## Overview
The AI Influencer Creator is a web application that allows users to create AI-generated influencers. Users can upload an image or generate one using predefined prompts, and then create a video using the generated image. This MVP focuses on providing a seamless experience for users to create and customize their AI influencers.

## Features
- **Image Generation:** Users can upload an image or input a prompt to generate an AI image.
- **Predefined Prompts:** Predefined images with associated prompts for quick selection.
- **Video Generation:** Create videos using the generated image and predefined video styles.
- **User-Friendly Interface:** Intuitive layout with responsive design for easy navigation.

## Tech Stack
- **Next.js:** A React framework for building fast and scalable web applications.
- **FallAI:** An AI service used for generating images and videos.
- **Tailwind CSS:** For styling and ensuring a responsive, modern design.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ai-influencer-creator.git
    cd ai-influencer-creator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env.local` file in the root directory.
    - Add the following environment variables:
      ```env
      FALLAI_API_KEY=your_fallai_api_key
      ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

1. **Image Generation:**
   - Use the left panel to upload an image or type a prompt.
   - Select a predefined image from the right panel if preferred.
   - Click "Generate Image" to create an AI-generated image.

2. **Video Generation:**
   - After generating an image, click the "Generate Video" button.
   - Use the left panel to input a video prompt.
   - Select a predefined video style from the right panel.
   - Click "Generate Video" to create a video using the AI-generated image.

3. **Download/Retry:**
   - Once the video is generated, download it or retry with a new prompt.


## Deployment

1. Build the application:
    ```bash
    npm run build
    ```

2. Start the production server:
    ```bash
    npm start
    ```

3. Deploy to a platform like Vercel or Netlify for continuous deployment.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.


