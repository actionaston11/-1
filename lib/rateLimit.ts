// lib/rateLimit.ts

interface UserRequest {
    timestamp: number;
    count: number;
}

const rateLimit: Record<string, UserRequest> = {};
const MAX_REQUESTS_PER_HOUR = 20;

export function checkRateLimit(userId: string): boolean {
    const currentTime = Date.now();
    const hourInMillis = 60 * 60 * 1000;

    if (!rateLimit[userId]) {
        rateLimit[userId] = { timestamp: currentTime, count: 0 };
    }

    const userData = rateLimit[userId];

    // Reset count if the hour has passed
    if (currentTime - userData.timestamp > hourInMillis) {
        userData.timestamp = currentTime;
        userData.count = 0;
    }

    // Check if user exceeds max requests
    if (userData.count < MAX_REQUESTS_PER_HOUR) {
        userData.count++;
        return true; // Request allowed
    }
    
    return false; // Request limit exceeded
}

export function getRemainingRequests(userId: string): number {
    const currentTime = Date.now();
    const hourInMillis = 60 * 60 * 1000;

    if (!rateLimit[userId]) {
        return MAX_REQUESTS_PER_HOUR; // All requests available for new users
    }

    const userData = rateLimit[userId];

    // Reset count if the hour has passed
    if (currentTime - userData.timestamp > hourInMillis) {
        return MAX_REQUESTS_PER_HOUR; // All requests available if the hour has passed
    }

    return MAX_REQUESTS_PER_HOUR - userData.count; // Remaining requests
}

export function resetRateLimit(userId: string): void {
    delete rateLimit[userId]; // Reset user data
}