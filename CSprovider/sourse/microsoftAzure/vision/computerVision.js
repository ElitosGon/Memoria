/*
The Computer Vision API provides state-of-the-art algorithms to process images and return information. For example, it can be used to determine if an image contains mature content, or it can be used to find all the faces in an image. It also has other features like estimating dominant and accent colors, categorizing the content of images, and describing an image with complete English sentences. Additionally, it can also intelligently generate images thumbnails for displaying large images effectively.
*/
require('dotenv').load();
var rp = require('request-promise');

const accessKey = process.env.COMPUTER_VISION_API_KEY;
const uri = process.env.COMPUTER_VISION_API_ENDPOINT;
const pathAnalyzeImage = '/analyze';
const pathDescribeImage = '/describe';
const pathGetHandwrittenTextOperationResult = '/textOperations';
const pathGetThumbnail = '/generateThumbnail';
const pathListDomainSpecificModels = '/models';
const pathOpticalCharacterRecognition = '/ocr';
const pathRecognizeDomainSpecificContent = '/models';
const pathRecognizeHandwrittenText = '/recognizeText';
const pathTagImage = '/tag';

module.exports = {
   
   /* This operation extracts a rich set of visual features based on the image content. Within your request, there is an optional parameter to allow you to choose which features to return. By default, image categories are returned in the response.  */
   analyzeImage: function(parameters, body, callback){
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathAnalyzeImage,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

    /* Get parameters object to analyze image function */
   parametersAnalyzeImage: function(visualFeatures__, details__, language__){
    return {
        visualFeatures: visualFeatures__,
        details: details__,
        language: language__
    }
   },

   /* Object to ganalize image function */
   bodyAnalyzeImage: function(url__){
    return {
        url: url__
    }
   },

   /* This operation generates a description of an image in human readable language with complete sentences. The description is based on a collection of content tags, which are also returned by the operation. More than one description can be generated for each image. Descriptions are ordered by their confidence score. All descriptions are in English.*/
   describeImage: function(parameters , body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathDescribeImage,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

    /* Get parameters object to describe image function */
   parametersDescribeImage: function(maxCandidates__){
    return {
        maxCandidates: maxCandidates__,
    }
   },

   /* Object to describe image function */
   bodyDescribeImage: function(url__){
    return {
        url: url__
    }
   },

   /* This interface is used for getting handwritten text operation result. The URL to this interface should be retrieved from “Operation-Location” field returned from Recognize Handwritten Text interface. */
   getHandwrittenTextOperationResult: function(parameters, callback){

        var options = {
            method: 'GET',
            uri: 'https://' + uri + pathGetHandwrittenTextOperationResult + '/' + parameters.operationId ,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 

   },

   /* Get parameters object to get handwritten text operation result function */
   parametersGetHandwrittenTextOperationResult: function(operationId__){
    return {
        operationId: operationId__,
    }
   },

   /* This operation generates a thumbnail image with the user-specified width and height. By default, the service analyzes the image, identifies the region of interest (ROI), and generates smart cropping coordinates based on the ROI. Smart cropping helps when you specify an aspect ratio that differs from that of the input image. */
   getThumbnail: function(parameters, body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathGetThumbnail,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Get parameters object to get thumbnail function */
   parametersGetThumbnail: function(width__, height__, smartCropping__){
    return {
        width: width__,
        height: height__,
        smartCropping: smartCropping__
    }
   },

   /* Object to get thumbnail function */
   bodyGetThumbnail: function(url__){
    return {
        url: url__
    }
   },

   /* This operation returns the list of domain-specific models that are supported by the Computer Vision API. Currently, the API supports following domain-specific models: celebrity recognizer, landmark recognizer. */
   listDomainSpecificModels: function(callback){

        var options = {
            method: 'GET',
            uri: 'https://' + uri + pathListDomainSpecificModels ,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Optical Character Recognition (OCR) detects text in an image and extracts the recognized characters into a machine-usable character stream. Upon success, the OCR results will be returned. */
   opticalCharacterRecognition: function(parameters, body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathOpticalCharacterRecognition,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 

   },

   /* Get parameters object to optical character recognition function */
   parametersOpticalCharacterRecognition: function(language__, detectOrientation__){
    return {
        language: language__,
        detectOrientation: detectOrientation__
    }
   },

   /* Object to optical character recognition function */
   bodyOpticalCharacterRecognition: function(url__){
    return {
        url: url__
    }
   },

   /* This operation recognizes content within an image by applying a domain-specific model. The list of domain-specific models that are supported by the Computer Vision API can be retrieved using the /models GET request. Currently, the API provides following domain-specific models: celebrities, landmarks. A successful response will be returned in JSON. If the request failed, the response will contain an error code and a message to help understand what went wrong.*/
   recognizeDomainSpecificContent: function(parameters, body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathRecognizeDomainSpecificContent + '/' + parameters.model + '/analyze',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Get parameters object to recognize domain specific content function */
   parametersRecognizeDomainSpecificContent: function(model__){
    return {
        model: model__
    }
   },

   /* Object to recognize domain specific content function */
   bodyRecognizeDomainSpecificContent: function(url__){
    return {
        url: url__
    }
   },

   /* Use this interface to get the result of a Recognize Handwritten Text operation. When you use the Recognize Handwritten Text interface, the response contains a field called “Operation-Location”. The “Operation-Location” field contains the URL that you must use for your Get Handwritten Text Operation Result operation. For the result of a Recognize Handwritten Text operation to be available, it requires an amount of time that depends on the length of the text. So, you may need to wait before using this Get Handwritten Text Operation Result interface. The time you need to wait may be up to a number of seconds. */
   recognizeHandwrittenText: function(parameters, body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathRecognizeHandwrittenText,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Get parameters object to recognize handwritten text function */
   parametersRecognizeHandwrittenText: function(handwriting__){
    return {
        handwriting: handwriting__
    }
   },

   /* Object to recognize handwritten text function */
   bodyRecognizeHandwrittenText: function(url__){
    return {
        url: url__
    }
   },

   /* This operation generates a list of words, or tags, that are relevant to the content of the supplied image. The Computer Vision API can return tags based on objects, living beings, scenery or actions found in images. Unlike categories, tags are not organized according to a hierarchical classification system, but correspond to image content. Tags may contain hints to avoid ambiguity or provide context, for example the tag “cello” may be accompanied by the hint “musical instrument”. All tags are in English. */
   tagImage: function(body, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathTagImage,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Object to tag image function */
   bodyTagImage: function(url__){
    return {
        url: url__
    }
   },


}

