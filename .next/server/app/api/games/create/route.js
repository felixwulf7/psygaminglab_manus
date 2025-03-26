/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/games/create/route";
exports.ids = ["app/api/games/create/route"];
exports.modules = {

/***/ "(rsc)/./app/api/games/create/route.ts":
/*!***************************************!*\
  !*** ./app/api/games/create/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n\n\n\n\nconst DEFAULT_MODEL = \"mistralai/Mixtral-8x7B-Instruct-v0.1\";\nconst DEEPINFRA_API_KEY = \"xXIq1CQzz2C2a3tIycGCZwDBAYjqnB4T\"; // Consider using environment variables\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const { userInput, model = DEFAULT_MODEL } = body;\n        if (!userInput) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required field: userInput'\n            }, {\n                status: 400\n            });\n        }\n        // Generate game content with AI\n        const gameContent = await generateWithDeepInfra(userInput, model);\n        // Create the game HTML file\n        const result = await createCustomGame(gameContent);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (error) {\n        console.error('Error creating game:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to create game'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function generateWithDeepInfra(userInput, model = DEFAULT_MODEL) {\n    const prompt = `\n  You are an expert in therapeutic game design and cognitive-behavioral therapy.\n  You are creating content for a 3D therapeutic game where players shoot positive thoughts (affirmations) at negative thoughts.\n  \n  The user has shared that they are struggling with: \"${userInput}\"\n  \n  You need to create custom content SPECIFICALLY TAILORED to this situation:\n  \n  1. Create a meaningful title for the game that directly relates to ${userInput}\n  2. Create 5 positive affirmations/thoughts that would help someone dealing with ${userInput}\n  3. Create 5 corresponding negative thoughts that someone struggling with ${userInput} might experience\n  \n  **VERY IMPORTANT INSTRUCTION**: Each positive thought must DIRECTLY counter a specific negative thought.\n  The game mechanics REQUIRE that:\n  - Positive thought #0 should counter negative thought with correctAmmo: 0\n  - Positive thought #1 should counter negative thought with correctAmmo: 1\n  - Positive thought #2 should counter negative thought with correctAmmo: 2\n  - Positive thought #3 should counter negative thought with correctAmmo: 3\n  - Positive thought #4 should counter negative thought with correctAmmo: 4\n  \n  Your response must be a valid JSON object with this exact structure:\n  {\n      \"title\": \"Game Title: Subtitle\",\n      \"positiveThoughts\": [\"positive1\", \"positive2\", \"positive3\", \"positive4\", \"positive5\"],\n      \"negativeThoughts\": [\n          {\"text\": \"negative1\", \"correctAmmo\": 0},\n          {\"text\": \"negative2\", \"correctAmmo\": 1},\n          {\"text\": \"negative3\", \"correctAmmo\": 2},\n          {\"text\": \"negative4\", \"correctAmmo\": 3},\n          {\"text\": \"negative5\", \"correctAmmo\": 4}\n      ]\n  }\n  \n  Make all thoughts concise (under 10 words if possible), impactful, and therapeutically sound.\n  Each thought should be highly specific to the user's situation about ${userInput}.\n  Return only the JSON object without any additional text.\n  `;\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(`https://api.deepinfra.com/v1/inference/${encodeURIComponent(model)}`, {\n            input: prompt,\n            max_new_tokens: 1024\n        }, {\n            headers: {\n                'Authorization': `Bearer ${DEEPINFRA_API_KEY}`,\n                'Content-Type': 'application/json'\n            }\n        });\n        const content = response.data.output;\n        // Parse the JSON from the LLM response\n        try {\n            const jsonStart = content.indexOf('{');\n            const jsonEnd = content.lastIndexOf('}') + 1;\n            if (jsonStart === -1 || jsonEnd <= jsonStart) {\n                throw new Error('Invalid JSON structure in response');\n            }\n            const jsonContent = content.substring(jsonStart, jsonEnd);\n            const parsedContent = JSON.parse(jsonContent);\n            // Validate required fields\n            if (!parsedContent.title || !parsedContent.positiveThoughts || !parsedContent.negativeThoughts) {\n                throw new Error('Missing required fields in response');\n            }\n            return parsedContent;\n        } catch (jsonError) {\n            console.error('Error parsing JSON from LLM response:', jsonError);\n            throw new Error('Failed to parse game content from AI response');\n        }\n    } catch (error) {\n        console.error('Error calling DeepInfra API:', error);\n        throw new Error('Failed to generate game content with AI');\n    }\n}\nasync function createCustomGame(gameContent) {\n    try {\n        // Generate a unique filename\n        const timestamp = Math.floor(Date.now() / 1000);\n        const filename = `custom_game_${timestamp}.html`;\n        const filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'games', filename);\n        // Get the template\n        const templatePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'templates', '3d_shooter_accepting_being_tired.html');\n        let templateContent = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(templatePath, 'utf-8');\n        // Replace template placeholders with game content\n        const gameTitle = gameContent.title || 'Custom Therapeutic Game';\n        const positiveThoughts = JSON.stringify(gameContent.positiveThoughts || []);\n        // Format negative thoughts correctly for the game\n        const negativeThoughts = gameContent.negativeThoughts || [];\n        let negativeThoughtsJs = 'const negativeThoughts = [\\n';\n        const colors = [\n            0xe74c3c,\n            0x3498db,\n            0x2ecc71,\n            0xf1c40f,\n            0x9b59b6\n        ]; // Red, Blue, Green, Yellow, Purple\n        const colorNames = [\n            'Red',\n            'Blue',\n            'Green',\n            'Yellow',\n            'Purple'\n        ];\n        negativeThoughts.forEach((thought, index)=>{\n            const text = thought.text || thought;\n            const correctAmmo = thought.correctAmmo !== undefined ? thought.correctAmmo : index;\n            const color = colors[index % colors.length];\n            const colorName = colorNames[index % colorNames.length];\n            negativeThoughtsJs += `    { text: \"${text}\", correctAmmo: ${correctAmmo}, color: ${color} }`;\n            if (index < negativeThoughts.length - 1) {\n                negativeThoughtsJs += `, // ${colorName}\\n`;\n            } else {\n                negativeThoughtsJs += ` // ${colorName}\\n`;\n            }\n        });\n        negativeThoughtsJs += '];';\n        // Replace placeholders in the template\n        templateContent = templateContent.replace('const gameTitle = \"Overcoming Fatigue\";', `const gameTitle = \"${gameTitle}\";`);\n        templateContent = templateContent.replace('const positiveThoughts = [', `const positiveThoughts = ${positiveThoughts.replace(/^\\[|\\]$/g, '')}\\n];`);\n        // Replace the entire negative thoughts array\n        const negThoughtsRegex = /const negativeThoughts = \\[\\s*[\\s\\S]*?\\];/;\n        templateContent = templateContent.replace(negThoughtsRegex, negativeThoughtsJs);\n        // Write the file\n        fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(filePath, templateContent);\n        return {\n            success: true,\n            filename,\n            url: `/games/${filename}`\n        };\n    } catch (error) {\n        console.error('Error creating custom game:', error);\n        throw new Error('Failed to create custom game file');\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dhbWVzL2NyZWF0ZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdEO0FBQ3BDO0FBQ0k7QUFDRTtBQUUxQixNQUFNSSxnQkFBZ0I7QUFDdEIsTUFBTUMsb0JBQW9CLG9DQUFvQyx1Q0FBdUM7QUFFOUYsZUFBZUMsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtRQUMvQixNQUFNLEVBQUVDLFNBQVMsRUFBRUMsUUFBUVAsYUFBYSxFQUFFLEdBQUdJO1FBRTdDLElBQUksQ0FBQ0UsV0FBVztZQUNkLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFRyxPQUFPO1lBQW9DLEdBQzdDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxnQ0FBZ0M7UUFDaEMsTUFBTUMsY0FBYyxNQUFNQyxzQkFBc0JMLFdBQVdDO1FBRTNELDRCQUE0QjtRQUM1QixNQUFNSyxTQUFTLE1BQU1DLGlCQUFpQkg7UUFFdEMsT0FBT2QscURBQVlBLENBQUNTLElBQUksQ0FBQ087SUFDM0IsRUFBRSxPQUFPSixPQUFPO1FBQ2RNLFFBQVFOLEtBQUssQ0FBQyx3QkFBd0JBO1FBQ3RDLE9BQU9aLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO1lBQUVHLE9BQU87UUFBd0IsR0FDakM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0Y7QUFFQSxlQUFlRSxzQkFBc0JMLFNBQWlCLEVBQUVDLFFBQVFQLGFBQWE7SUFDM0UsTUFBTWUsU0FBUyxDQUFDOzs7O3NEQUlvQyxFQUFFVCxVQUFVOzs7O3FFQUlHLEVBQUVBLFVBQVU7a0ZBQ0MsRUFBRUEsVUFBVTsyRUFDbkIsRUFBRUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VFQXdCaEIsRUFBRUEsVUFBVTs7RUFFakYsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNVSxXQUFXLE1BQU1qQiw2Q0FBS0EsQ0FBQ2tCLElBQUksQ0FDL0IsQ0FB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QzVDO1FBQ0Y7UUFFQVgsc0JBQXNCO1FBRXRCLHVDQUF1QztRQUN2Q0osa0JBQWtCQSxnQkFBZ0JnQixPQUFPLENBQUMsMkNBQTJDLENBQUMsbUJBQW1CLEVBQUVkLFVBQVUsRUFBRSxDQUFDO1FBQ3hIRixrQkFBa0JBLGdCQUFnQmdCLE9BQU8sQ0FDdkMsOEJBQ0EsQ0FBQyx5QkFBeUIsRUFBRTlCLGlCQUFpQjhCLE9BQU8sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBRzVFLDZDQUE2QztRQUM3QyxNQUFNQyxtQkFBbUI7UUFDekJqQixrQkFBa0JBLGdCQUFnQmdCLE9BQU8sQ0FBQ0Msa0JBQWtCYjtRQUU1RCxpQkFBaUI7UUFDakJ6RCx1REFBZ0IsQ0FBQ2dELFVBQVVLO1FBRTNCLE9BQU87WUFDTG1CLFNBQVM7WUFDVHpCO1lBQ0EwQixLQUFLLENBQUMsT0FBTyxFQUFFMUIsVUFBVTtRQUMzQjtJQUNGLEVBQUUsT0FBT3BDLE9BQU87UUFDZE0sUUFBUU4sS0FBSyxDQUFDLCtCQUErQkE7UUFDN0MsTUFBTSxJQUFJcUIsTUFBTTtJQUNsQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvZmVsaXh3dWxmL0N1cnNvci90cnlpbmdpbmdfcHV0dGluZ190b2dldGhlcmFnYWluL3BzeWdhbWluZ2xhYl9tYW51cy9hcHAvYXBpL2dhbWVzL2NyZWF0ZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgREVGQVVMVF9NT0RFTCA9IFwibWlzdHJhbGFpL01peHRyYWwtOHg3Qi1JbnN0cnVjdC12MC4xXCI7XG5jb25zdCBERUVQSU5GUkFfQVBJX0tFWSA9IFwieFhJcTFDUXp6MkMyYTN0SXljR0Nad0RCQVlqcW5CNFRcIjsgLy8gQ29uc2lkZXIgdXNpbmcgZW52aXJvbm1lbnQgdmFyaWFibGVzXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnN0IHsgdXNlcklucHV0LCBtb2RlbCA9IERFRkFVTFRfTU9ERUwgfSA9IGJvZHk7XG5cbiAgICBpZiAoIXVzZXJJbnB1dCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZDogdXNlcklucHV0JyB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgZ2FtZSBjb250ZW50IHdpdGggQUlcbiAgICBjb25zdCBnYW1lQ29udGVudCA9IGF3YWl0IGdlbmVyYXRlV2l0aERlZXBJbmZyYSh1c2VySW5wdXQsIG1vZGVsKTtcbiAgICBcbiAgICAvLyBDcmVhdGUgdGhlIGdhbWUgSFRNTCBmaWxlXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY3JlYXRlQ3VzdG9tR2FtZShnYW1lQ29udGVudCk7XG4gICAgXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgZ2FtZTonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBjcmVhdGUgZ2FtZScgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVXaXRoRGVlcEluZnJhKHVzZXJJbnB1dDogc3RyaW5nLCBtb2RlbCA9IERFRkFVTFRfTU9ERUwpIHtcbiAgY29uc3QgcHJvbXB0ID0gYFxuICBZb3UgYXJlIGFuIGV4cGVydCBpbiB0aGVyYXBldXRpYyBnYW1lIGRlc2lnbiBhbmQgY29nbml0aXZlLWJlaGF2aW9yYWwgdGhlcmFweS5cbiAgWW91IGFyZSBjcmVhdGluZyBjb250ZW50IGZvciBhIDNEIHRoZXJhcGV1dGljIGdhbWUgd2hlcmUgcGxheWVycyBzaG9vdCBwb3NpdGl2ZSB0aG91Z2h0cyAoYWZmaXJtYXRpb25zKSBhdCBuZWdhdGl2ZSB0aG91Z2h0cy5cbiAgXG4gIFRoZSB1c2VyIGhhcyBzaGFyZWQgdGhhdCB0aGV5IGFyZSBzdHJ1Z2dsaW5nIHdpdGg6IFwiJHt1c2VySW5wdXR9XCJcbiAgXG4gIFlvdSBuZWVkIHRvIGNyZWF0ZSBjdXN0b20gY29udGVudCBTUEVDSUZJQ0FMTFkgVEFJTE9SRUQgdG8gdGhpcyBzaXR1YXRpb246XG4gIFxuICAxLiBDcmVhdGUgYSBtZWFuaW5nZnVsIHRpdGxlIGZvciB0aGUgZ2FtZSB0aGF0IGRpcmVjdGx5IHJlbGF0ZXMgdG8gJHt1c2VySW5wdXR9XG4gIDIuIENyZWF0ZSA1IHBvc2l0aXZlIGFmZmlybWF0aW9ucy90aG91Z2h0cyB0aGF0IHdvdWxkIGhlbHAgc29tZW9uZSBkZWFsaW5nIHdpdGggJHt1c2VySW5wdXR9XG4gIDMuIENyZWF0ZSA1IGNvcnJlc3BvbmRpbmcgbmVnYXRpdmUgdGhvdWdodHMgdGhhdCBzb21lb25lIHN0cnVnZ2xpbmcgd2l0aCAke3VzZXJJbnB1dH0gbWlnaHQgZXhwZXJpZW5jZVxuICBcbiAgKipWRVJZIElNUE9SVEFOVCBJTlNUUlVDVElPTioqOiBFYWNoIHBvc2l0aXZlIHRob3VnaHQgbXVzdCBESVJFQ1RMWSBjb3VudGVyIGEgc3BlY2lmaWMgbmVnYXRpdmUgdGhvdWdodC5cbiAgVGhlIGdhbWUgbWVjaGFuaWNzIFJFUVVJUkUgdGhhdDpcbiAgLSBQb3NpdGl2ZSB0aG91Z2h0ICMwIHNob3VsZCBjb3VudGVyIG5lZ2F0aXZlIHRob3VnaHQgd2l0aCBjb3JyZWN0QW1tbzogMFxuICAtIFBvc2l0aXZlIHRob3VnaHQgIzEgc2hvdWxkIGNvdW50ZXIgbmVnYXRpdmUgdGhvdWdodCB3aXRoIGNvcnJlY3RBbW1vOiAxXG4gIC0gUG9zaXRpdmUgdGhvdWdodCAjMiBzaG91bGQgY291bnRlciBuZWdhdGl2ZSB0aG91Z2h0IHdpdGggY29ycmVjdEFtbW86IDJcbiAgLSBQb3NpdGl2ZSB0aG91Z2h0ICMzIHNob3VsZCBjb3VudGVyIG5lZ2F0aXZlIHRob3VnaHQgd2l0aCBjb3JyZWN0QW1tbzogM1xuICAtIFBvc2l0aXZlIHRob3VnaHQgIzQgc2hvdWxkIGNvdW50ZXIgbmVnYXRpdmUgdGhvdWdodCB3aXRoIGNvcnJlY3RBbW1vOiA0XG4gIFxuICBZb3VyIHJlc3BvbnNlIG11c3QgYmUgYSB2YWxpZCBKU09OIG9iamVjdCB3aXRoIHRoaXMgZXhhY3Qgc3RydWN0dXJlOlxuICB7XG4gICAgICBcInRpdGxlXCI6IFwiR2FtZSBUaXRsZTogU3VidGl0bGVcIixcbiAgICAgIFwicG9zaXRpdmVUaG91Z2h0c1wiOiBbXCJwb3NpdGl2ZTFcIiwgXCJwb3NpdGl2ZTJcIiwgXCJwb3NpdGl2ZTNcIiwgXCJwb3NpdGl2ZTRcIiwgXCJwb3NpdGl2ZTVcIl0sXG4gICAgICBcIm5lZ2F0aXZlVGhvdWdodHNcIjogW1xuICAgICAgICAgIHtcInRleHRcIjogXCJuZWdhdGl2ZTFcIiwgXCJjb3JyZWN0QW1tb1wiOiAwfSxcbiAgICAgICAgICB7XCJ0ZXh0XCI6IFwibmVnYXRpdmUyXCIsIFwiY29ycmVjdEFtbW9cIjogMX0sXG4gICAgICAgICAge1widGV4dFwiOiBcIm5lZ2F0aXZlM1wiLCBcImNvcnJlY3RBbW1vXCI6IDJ9LFxuICAgICAgICAgIHtcInRleHRcIjogXCJuZWdhdGl2ZTRcIiwgXCJjb3JyZWN0QW1tb1wiOiAzfSxcbiAgICAgICAgICB7XCJ0ZXh0XCI6IFwibmVnYXRpdmU1XCIsIFwiY29ycmVjdEFtbW9cIjogNH1cbiAgICAgIF1cbiAgfVxuICBcbiAgTWFrZSBhbGwgdGhvdWdodHMgY29uY2lzZSAodW5kZXIgMTAgd29yZHMgaWYgcG9zc2libGUpLCBpbXBhY3RmdWwsIGFuZCB0aGVyYXBldXRpY2FsbHkgc291bmQuXG4gIEVhY2ggdGhvdWdodCBzaG91bGQgYmUgaGlnaGx5IHNwZWNpZmljIHRvIHRoZSB1c2VyJ3Mgc2l0dWF0aW9uIGFib3V0ICR7dXNlcklucHV0fS5cbiAgUmV0dXJuIG9ubHkgdGhlIEpTT04gb2JqZWN0IHdpdGhvdXQgYW55IGFkZGl0aW9uYWwgdGV4dC5cbiAgYDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcbiAgICAgIGBodHRwczovL2FwaS5kZWVwaW5mcmEuY29tL3YxL2luZmVyZW5jZS8ke2VuY29kZVVSSUNvbXBvbmVudChtb2RlbCl9YCxcbiAgICAgIHtcbiAgICAgICAgaW5wdXQ6IHByb21wdCxcbiAgICAgICAgbWF4X25ld190b2tlbnM6IDEwMjQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7REVFUElORlJBX0FQSV9LRVl9YCxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgY29udGVudCA9IHJlc3BvbnNlLmRhdGEub3V0cHV0O1xuICAgIFxuICAgIC8vIFBhcnNlIHRoZSBKU09OIGZyb20gdGhlIExMTSByZXNwb25zZVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBqc29uU3RhcnQgPSBjb250ZW50LmluZGV4T2YoJ3snKTtcbiAgICAgIGNvbnN0IGpzb25FbmQgPSBjb250ZW50Lmxhc3RJbmRleE9mKCd9JykgKyAxO1xuICAgICAgXG4gICAgICBpZiAoanNvblN0YXJ0ID09PSAtMSB8fCBqc29uRW5kIDw9IGpzb25TdGFydCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSlNPTiBzdHJ1Y3R1cmUgaW4gcmVzcG9uc2UnKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QganNvbkNvbnRlbnQgPSBjb250ZW50LnN1YnN0cmluZyhqc29uU3RhcnQsIGpzb25FbmQpO1xuICAgICAgY29uc3QgcGFyc2VkQ29udGVudCA9IEpTT04ucGFyc2UoanNvbkNvbnRlbnQpO1xuICAgICAgXG4gICAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcbiAgICAgIGlmICghcGFyc2VkQ29udGVudC50aXRsZSB8fCAhcGFyc2VkQ29udGVudC5wb3NpdGl2ZVRob3VnaHRzIHx8ICFwYXJzZWRDb250ZW50Lm5lZ2F0aXZlVGhvdWdodHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGZpZWxkcyBpbiByZXNwb25zZScpO1xuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4gcGFyc2VkQ29udGVudDtcbiAgICB9IGNhdGNoIChqc29uRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBhcnNpbmcgSlNPTiBmcm9tIExMTSByZXNwb25zZTonLCBqc29uRXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcGFyc2UgZ2FtZSBjb250ZW50IGZyb20gQUkgcmVzcG9uc2UnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY2FsbGluZyBEZWVwSW5mcmEgQVBJOicsIGVycm9yKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBnZW5lcmF0ZSBnYW1lIGNvbnRlbnQgd2l0aCBBSScpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUdhbWUoZ2FtZUNvbnRlbnQ6IGFueSkge1xuICB0cnkge1xuICAgIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGZpbGVuYW1lXG4gICAgY29uc3QgdGltZXN0YW1wID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBgY3VzdG9tX2dhbWVfJHt0aW1lc3RhbXB9Lmh0bWxgO1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwdWJsaWMnLCAnZ2FtZXMnLCBmaWxlbmFtZSk7XG4gICAgXG4gICAgLy8gR2V0IHRoZSB0ZW1wbGF0ZVxuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAncHVibGljJywgJ3RlbXBsYXRlcycsICczZF9zaG9vdGVyX2FjY2VwdGluZ19iZWluZ190aXJlZC5odG1sJyk7XG4gICAgbGV0IHRlbXBsYXRlQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZVBhdGgsICd1dGYtOCcpO1xuICAgIFxuICAgIC8vIFJlcGxhY2UgdGVtcGxhdGUgcGxhY2Vob2xkZXJzIHdpdGggZ2FtZSBjb250ZW50XG4gICAgY29uc3QgZ2FtZVRpdGxlID0gZ2FtZUNvbnRlbnQudGl0bGUgfHwgJ0N1c3RvbSBUaGVyYXBldXRpYyBHYW1lJztcbiAgICBjb25zdCBwb3NpdGl2ZVRob3VnaHRzID0gSlNPTi5zdHJpbmdpZnkoZ2FtZUNvbnRlbnQucG9zaXRpdmVUaG91Z2h0cyB8fCBbXSk7XG4gICAgXG4gICAgLy8gRm9ybWF0IG5lZ2F0aXZlIHRob3VnaHRzIGNvcnJlY3RseSBmb3IgdGhlIGdhbWVcbiAgICBjb25zdCBuZWdhdGl2ZVRob3VnaHRzID0gZ2FtZUNvbnRlbnQubmVnYXRpdmVUaG91Z2h0cyB8fCBbXTtcbiAgICBsZXQgbmVnYXRpdmVUaG91Z2h0c0pzID0gJ2NvbnN0IG5lZ2F0aXZlVGhvdWdodHMgPSBbXFxuJztcbiAgICBcbiAgICBjb25zdCBjb2xvcnMgPSBbMHhlNzRjM2MsIDB4MzQ5OGRiLCAweDJlY2M3MSwgMHhmMWM0MGYsIDB4OWI1OWI2XTsgLy8gUmVkLCBCbHVlLCBHcmVlbiwgWWVsbG93LCBQdXJwbGVcbiAgICBjb25zdCBjb2xvck5hbWVzID0gWydSZWQnLCAnQmx1ZScsICdHcmVlbicsICdZZWxsb3cnLCAnUHVycGxlJ107XG4gICAgXG4gICAgbmVnYXRpdmVUaG91Z2h0cy5mb3JFYWNoKCh0aG91Z2h0OiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSB0aG91Z2h0LnRleHQgfHwgdGhvdWdodDtcbiAgICAgIGNvbnN0IGNvcnJlY3RBbW1vID0gdGhvdWdodC5jb3JyZWN0QW1tbyAhPT0gdW5kZWZpbmVkID8gdGhvdWdodC5jb3JyZWN0QW1tbyA6IGluZGV4O1xuICAgICAgY29uc3QgY29sb3IgPSBjb2xvcnNbaW5kZXggJSBjb2xvcnMubGVuZ3RoXTtcbiAgICAgIGNvbnN0IGNvbG9yTmFtZSA9IGNvbG9yTmFtZXNbaW5kZXggJSBjb2xvck5hbWVzLmxlbmd0aF07XG4gICAgICBcbiAgICAgIG5lZ2F0aXZlVGhvdWdodHNKcyArPSBgICAgIHsgdGV4dDogXCIke3RleHR9XCIsIGNvcnJlY3RBbW1vOiAke2NvcnJlY3RBbW1vfSwgY29sb3I6ICR7Y29sb3J9IH1gO1xuICAgICAgXG4gICAgICBpZiAoaW5kZXggPCBuZWdhdGl2ZVRob3VnaHRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgbmVnYXRpdmVUaG91Z2h0c0pzICs9IGAsIC8vICR7Y29sb3JOYW1lfVxcbmA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZWdhdGl2ZVRob3VnaHRzSnMgKz0gYCAvLyAke2NvbG9yTmFtZX1cXG5gO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIG5lZ2F0aXZlVGhvdWdodHNKcyArPSAnXTsnO1xuICAgIFxuICAgIC8vIFJlcGxhY2UgcGxhY2Vob2xkZXJzIGluIHRoZSB0ZW1wbGF0ZVxuICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlQ29udGVudC5yZXBsYWNlKCdjb25zdCBnYW1lVGl0bGUgPSBcIk92ZXJjb21pbmcgRmF0aWd1ZVwiOycsIGBjb25zdCBnYW1lVGl0bGUgPSBcIiR7Z2FtZVRpdGxlfVwiO2ApO1xuICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlQ29udGVudC5yZXBsYWNlKFxuICAgICAgJ2NvbnN0IHBvc2l0aXZlVGhvdWdodHMgPSBbJyxcbiAgICAgIGBjb25zdCBwb3NpdGl2ZVRob3VnaHRzID0gJHtwb3NpdGl2ZVRob3VnaHRzLnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyl9XFxuXTtgXG4gICAgKTtcbiAgICBcbiAgICAvLyBSZXBsYWNlIHRoZSBlbnRpcmUgbmVnYXRpdmUgdGhvdWdodHMgYXJyYXlcbiAgICBjb25zdCBuZWdUaG91Z2h0c1JlZ2V4ID0gL2NvbnN0IG5lZ2F0aXZlVGhvdWdodHMgPSBcXFtcXHMqW1xcc1xcU10qP1xcXTsvO1xuICAgIHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlQ29udGVudC5yZXBsYWNlKG5lZ1Rob3VnaHRzUmVnZXgsIG5lZ2F0aXZlVGhvdWdodHNKcyk7XG4gICAgXG4gICAgLy8gV3JpdGUgdGhlIGZpbGVcbiAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB0ZW1wbGF0ZUNvbnRlbnQpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgZmlsZW5hbWUsXG4gICAgICB1cmw6IGAvZ2FtZXMvJHtmaWxlbmFtZX1gXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBjdXN0b20gZ2FtZTonLCBlcnJvcik7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGN1c3RvbSBnYW1lIGZpbGUnKTtcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZnMiLCJwYXRoIiwiYXhpb3MiLCJERUZBVUxUX01PREVMIiwiREVFUElORlJBX0FQSV9LRVkiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwidXNlcklucHV0IiwibW9kZWwiLCJlcnJvciIsInN0YXR1cyIsImdhbWVDb250ZW50IiwiZ2VuZXJhdGVXaXRoRGVlcEluZnJhIiwicmVzdWx0IiwiY3JlYXRlQ3VzdG9tR2FtZSIsImNvbnNvbGUiLCJwcm9tcHQiLCJyZXNwb25zZSIsInBvc3QiLCJlbmNvZGVVUklDb21wb25lbnQiLCJpbnB1dCIsIm1heF9uZXdfdG9rZW5zIiwiaGVhZGVycyIsImNvbnRlbnQiLCJkYXRhIiwib3V0cHV0IiwianNvblN0YXJ0IiwiaW5kZXhPZiIsImpzb25FbmQiLCJsYXN0SW5kZXhPZiIsIkVycm9yIiwianNvbkNvbnRlbnQiLCJzdWJzdHJpbmciLCJwYXJzZWRDb250ZW50IiwiSlNPTiIsInBhcnNlIiwidGl0bGUiLCJwb3NpdGl2ZVRob3VnaHRzIiwibmVnYXRpdmVUaG91Z2h0cyIsImpzb25FcnJvciIsInRpbWVzdGFtcCIsIk1hdGgiLCJmbG9vciIsIkRhdGUiLCJub3ciLCJmaWxlbmFtZSIsImZpbGVQYXRoIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJ0ZW1wbGF0ZVBhdGgiLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJyZWFkRmlsZVN5bmMiLCJnYW1lVGl0bGUiLCJzdHJpbmdpZnkiLCJuZWdhdGl2ZVRob3VnaHRzSnMiLCJjb2xvcnMiLCJjb2xvck5hbWVzIiwiZm9yRWFjaCIsInRob3VnaHQiLCJpbmRleCIsInRleHQiLCJjb3JyZWN0QW1tbyIsInVuZGVmaW5lZCIsImNvbG9yIiwibGVuZ3RoIiwiY29sb3JOYW1lIiwicmVwbGFjZSIsIm5lZ1Rob3VnaHRzUmVnZXgiLCJ3cml0ZUZpbGVTeW5jIiwic3VjY2VzcyIsInVybCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/games/create/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgames%2Fcreate%2Froute&page=%2Fapi%2Fgames%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgames%2Fcreate%2Froute.ts&appDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgames%2Fcreate%2Froute&page=%2Fapi%2Fgames%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgames%2Fcreate%2Froute.ts&appDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_felixwulf_Cursor_tryinging_putting_togetheragain_psygaminglab_manus_app_api_games_create_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/games/create/route.ts */ \"(rsc)/./app/api/games/create/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/games/create/route\",\n        pathname: \"/api/games/create\",\n        filename: \"route\",\n        bundlePath: \"app/api/games/create/route\"\n    },\n    resolvedPagePath: \"/Users/felixwulf/Cursor/tryinging_putting_togetheragain/psygaminglab_manus/app/api/games/create/route.ts\",\n    nextConfigOutput,\n    userland: _Users_felixwulf_Cursor_tryinging_putting_togetheragain_psygaminglab_manus_app_api_games_create_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnYW1lcyUyRmNyZWF0ZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2FtZXMlMkZjcmVhdGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnYW1lcyUyRmNyZWF0ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmZlbGl4d3VsZiUyRkN1cnNvciUyRnRyeWluZ2luZ19wdXR0aW5nX3RvZ2V0aGVyYWdhaW4lMkZwc3lnYW1pbmdsYWJfbWFudXMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGZmVsaXh3dWxmJTJGQ3Vyc29yJTJGdHJ5aW5naW5nX3B1dHRpbmdfdG9nZXRoZXJhZ2FpbiUyRnBzeWdhbWluZ2xhYl9tYW51cyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0Q7QUFDckk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9mZWxpeHd1bGYvQ3Vyc29yL3RyeWluZ2luZ19wdXR0aW5nX3RvZ2V0aGVyYWdhaW4vcHN5Z2FtaW5nbGFiX21hbnVzL2FwcC9hcGkvZ2FtZXMvY3JlYXRlL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9nYW1lcy9jcmVhdGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9nYW1lcy9jcmVhdGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2dhbWVzL2NyZWF0ZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9mZWxpeHd1bGYvQ3Vyc29yL3RyeWluZ2luZ19wdXR0aW5nX3RvZ2V0aGVyYWdhaW4vcHN5Z2FtaW5nbGFiX21hbnVzL2FwcC9hcGkvZ2FtZXMvY3JlYXRlL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgames%2Fcreate%2Froute&page=%2Fapi%2Fgames%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgames%2Fcreate%2Froute.ts&appDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/follow-redirects","vendor-chunks/debug","vendor-chunks/get-intrinsic","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/function-bind","vendor-chunks/es-set-tostringtag","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/has-flag","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgames%2Fcreate%2Froute&page=%2Fapi%2Fgames%2Fcreate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgames%2Fcreate%2Froute.ts&appDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Ffelixwulf%2FCursor%2Ftryinging_putting_togetheragain%2Fpsygaminglab_manus&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();