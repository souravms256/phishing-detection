document.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.getElementById('scanButton');
    const loadingDiv = document.getElementById('loading');
    const resultArea = document.getElementById('result-area');
    const verdictIcon = document.getElementById('verdict-icon');
    const verdictText = document.getElementById('verdict-text');
    const reasoningText = document.getElementById('reasoning-text');
    const errorDiv = document.getElementById('error-message');

    scanButton.addEventListener('click', async () => {
        // Reset and show loading state
        resultArea.style.opacity = '0';
        resultArea.classList.add('hidden');
        errorDiv.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        scanButton.disabled = true;

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const { url } = tab;

            // Execute a content script to get the page's text
            const [{ result: pageContent }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => document.body.innerText.slice(0, 4000) // Truncate content for efficiency
            });

            // Make a request to the FastAPI backend
            const response = await fetch('http://127.0.0.1:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url, content: pageContent })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get a response from the server.');
            }

            const data = await response.json();
            const { verdict, reasoning } = data;

            // Update UI with the result
            verdictText.textContent = verdict;
            reasoningText.textContent = reasoning;
            resultArea.classList.remove('hidden');

            if (verdict === 'Phishing') {
                verdictIcon.textContent = '⚠️';
                resultArea.classList.add('bg-red-100');
                resultArea.classList.remove('bg-green-100');
            } else {
                verdictIcon.textContent = '✅';
                resultArea.classList.add('bg-green-100');
                resultArea.classList.remove('bg-red-100');
            }

            // Fade in the result area
            setTimeout(() => resultArea.style.opacity = '1', 10);

        } catch (error) {
            console.error('An error occurred:', error);
            errorDiv.textContent = `Error: ${error.message}. Please check if the backend is running.`;
            errorDiv.classList.remove('hidden');
        } finally {
            loadingDiv.classList.add('hidden');
            scanButton.disabled = false;
        }
    });
});
