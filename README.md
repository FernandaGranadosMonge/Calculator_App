# Environment setup and running code

1. Open VSCode (or your preferred IDE)

2. Inside your selected folder, run the following command in the terminal to download the project:
    ```
    git clone https://github.com/FernandaGranadosMonge/Calculator_App
    ```

3. Downloading the project will create a folder with the name Calculator_App. Change your directory to the new folder:
    ```
    cd .\Calculator_App
    ```

## Backend
1. Navigate to the backend folder
    ```
    cd .\backend
    ```

2. Create and activate a virtual environment with the following commands:
    - **Create it**
    ```
    python -m venv .venv
    ```

    - **Activate it**

    | Platform | Shell      | Command                          |
    | -------- | ---------- | -------------------------------- |
    | Windows  | PowerShell | `.venv\Scripts\Activate.ps1`     |
    | Windows  | cdm.exe    | `.venv\Scripts\Activate.bat`     |
    | Posix    | bash/zsh   | `source .venv/bin/activate`      |
    | Posix    | fish       | `source .venv/bin/activate.fish` |
    | Posix    | csh/tcsh   | `source .venv/bin/activate.csh`  |
    | Posix    | pwsh       | `.venv\Scripts\Activate.ps1`     |


3. Install dependencies
    ```
    pip install -r requirements.txt
    ```

4. You can run unit and API tests with
    ```
    python -m pytest
    ```

5. For the coverage report run
    ```
    python -m pytest --cov=. --cov-report=term-missing
    ```

6. Run the backend server (It will run locally at http://localhost:8000)
    ```
    fastapi run
    ```


## Frontend
1. Open a new terminal
2. Navigate to the frontend folder
    ```
    cd .\Calculator_App
    cd .\frontend
    ```

3. Install dependencies
    ```
    npm i
    ```

4. Build and run project
    ```
    npm run build
    npm run preview
    ```

5. Open your browser and navigate to the local server address to view the calculator
    ```
    http://localhost:4173
    ```

6. You can run unit tests with
    ```
    npm run test:run
    ```

7. To calculate and see the coverage report in the terminal, run
    ```
    npm run test:run -- --coverage
    ```

# Examples of API calling:
## API called and received success response

1. Request should include a JSON file with operand1, operand2 and operation:
    ```
    {
        "operand1": 200,
        "operand2": 20,
        "operation": "add"
    }
    ```
2. Send a POST request to the server address with the request data (in this case localhost:8000):
    ```
    POST http://localhost:8000/calculate
    ```
3. The response will be as follows:
    ```
    With a 200 OK status code
    {
        "result": 220.0
    }
    ```

## API called and received value error

1. Request should include a JSON file with operand1, operand2 and operation:
    ```
    {
        "operand1": 200,
        "operand2": 0,
        "operation": "division"
    }
    ```
2. Send a POST request to the server address with the request data (in this case localhost:8000):
    ```
    POST http://localhost:8000/calculate
    ```
3. The response will be as follows:
    ```
    With a 400 Bad Request status code
    {
        "detail": "Cannot divide by zero."
    }
    ```

# Design decisions and assumptions
- I am assuming that "backend microservice" from the requirements refers to this being an independent service that is then integrated into a more complex application, so this backend manages its own server, routes endpoints and logic, rather than creating a service for each operation or something similar to that.

- I decided to make the backend with FastAPI and Python instead of the preferred Go because I am much more familiar with the former and, although learning Go wouldn't be a problem for me, learning Go right now would require this project to take longer than the specified 2-4 hours.

- I decided to only create 1 endpoint --> \calculate\
This is because I wanted to create a clear separation between the frontend and the backend layers. The API endpoint receives the request from the frontend and passes it onto a function that provides the result from the specified operation requested. This means the frontend does not need to manage various endpoints for the calculator service, the API just concerns itself with receiving HTTP requests and sending out JSON responses, and the business logic is separated into its own concise functions with their own restrictions in order to perform the correct calculations.
Both frontend and backend can scale on their own and more operations can be added by only modifying the business logic of the calculator service and adding buttons to perform these operations.

- For the frontend, I separated the different components into folders in order to keep a clear structure and allow for easier testing. There is a folder for reusable components, another with different functions for the calculator service, another with the interfaces needed and, lastly, one for tests.

- There is an error message shown with Toastify that promptly notifies the user if something went wrong with the application instead of leaving them waiting for a response.

- For unit testing, I decided to use pytest for the backend (because I had already used it before) and vitest for the frontend, since I had already decided to use Vite to aid in development because of its compatibility with React and TypeScript and comfortability for building and starting servers.