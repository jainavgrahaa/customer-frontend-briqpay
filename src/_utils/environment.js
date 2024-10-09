const environment = {
    trustpilot: {
        url: "https://uk.trustpilot.com/review/austenblake.com",
        inlineReview: {
            businessUnitId: "5c79d087197b410001b88d9f",
            templateId: "5419b637fa0340045cd0c936"
        },
        chatView: {
            businessUnitId: "5c79d087197b410001b88d9f",
            templateId: "54d0e1d8764ea9078c79e6ee"
        },
        slider: {
            businessUnitId: "5c79d087197b410001b88d9f",
            templateId: "53aa8912dec7e10d38f59f36"
        },
        reviewSection: {
            businessUnitId: "5c79d087197b410001b88d9f",
            templateId: "539adbd6dec7e10e686debee"
        }
    },
    trustpilotDF: {
        url: "https://uk.trustpilot.com/review/www.diamondsfactory.co.uk",
        inlineReview: {
            businessUnitId: "4cc5012400006400050e0a76",
            templateId: "5419b637fa0340045cd0c936"
        },
        chatView: {
            businessUnitId: "4cc5012400006400050e0a76",
            templateId: "54d0e1d8764ea9078c79e6ee"
        },
        slider: {
            businessUnitId: "4cc5012400006400050e0a76",
            templateId: "53aa8912dec7e10d38f59f36"
        },
        reviewSection: {
            businessUnitId: "4cc5012400006400050e0a76",
            templateId: "539ad60defb9600b94d7df2c"
        }
    },
    googleReview: {
        url: "https://customerreviews.google.com/v/merchant?q=austenblake.com&c=GB&v=19"
        // url: "https://customerreviews.google.com/v/merchant?q=diamondsfactory.co.uk&c=GB&v=19"
    },
    googleMap: {
        // apiKey: "AIzaSyDk6KE0QNoxbjZbkCFP--gzKDI5oyCFzQ4"
        apiKey: "AIzaSyAyMsjpGGBKLAbR-ZFpg2-dl-9qvt4bl-g"

    }
}

export default environment;

// export const staticDomain=process.env.NEXT_PUBLIC_DOMAIN
