function validateUrl(url) {
    if (!url || typeof url !== 'string') {
        return {
            isValid: false,
            error: 'No URL provided.',
            normalizedUrl: null
        };
    }

    // Clean up the URL - remove spaces and convert spoken characters
    let normalizedUrl = url.trim()
        .replace(/\s+/g, '')
        .replace(/colon/g, ':')
        .replace(/slash/g, '/')
        .replace(/dot/g, '.')
        .replace(/backslash/g, '/')
        .replace(/http colon slash slash/gi, 'http://')
        .replace(/https colon slash slash/gi, 'https://');

    // Add protocol if missing
    if (!normalizedUrl.match(/^https?:\/\//)) {
        normalizedUrl = 'https://' + normalizedUrl;
    }

    try {
        const parsedUrl = new URL(normalizedUrl);
        
        // Check for HLS or Icecast patterns
        const isHls = normalizedUrl.includes('.m3u8') || normalizedUrl.includes('.m3u');
        const isIcecast = normalizedUrl.includes('/stream') || 
                          normalizedUrl.includes('/live') || 
                          normalizedUrl.includes('/radio') ||
                          normalizedUrl.includes('.mp3') ||
                          normalizedUrl.includes('/icecast');

        if (!isHls && !isIcecast) {
            return {
                isValid: false,
                error: 'URL must be an HLS (.m3u8) or Icecast stream.',
                normalizedUrl: null
            };
        }

        // Basic URL validation
        if (!parsedUrl.hostname) {
            return {
                isValid: false,
                error: 'Invalid URL format.',
                normalizedUrl: null
            };
        }

        return {
            isValid: true,
            error: null,
            normalizedUrl: normalizedUrl
        };

    } catch (error) {
        return {
            isValid: false,
            error: 'Invalid URL format.',
            normalizedUrl: null
        };
    }
}

module.exports = { validateUrl };