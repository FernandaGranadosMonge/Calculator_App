# Environment setup and running code

1. Open VSCode (or your preferred IDE)

2. Inside your selected folder, run the following command in the terminal to download the project:
    ```
    git clone https://github.com/FernandaGranadosMonge/Calculator_App.git
    ```

3. Downloading the project will create a folder with the name Calculator_App. Change your directory to the new folder:
    ```
    cd .\Calculator_App
    ```

## Backend
4. Navigate to the backend folder
    ```
    cd .\backend
    ```

5. Create and activate a virtual environment with the following commands:
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


6. Install dependencies
    ```
    pip install -r requirements.txt
    ```

7. Run project
    ```
    fastapi dev
    ```
