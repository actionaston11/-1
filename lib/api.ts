// API call utilities

export const apiCall = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

// Text sanitization
export const sanitizeText = (text) => {
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
};

// Currency formatting
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

// Email validation
export const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

// Clipboard copying
export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

// File download
export const downloadFile = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};