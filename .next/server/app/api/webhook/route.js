"use strict";
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
exports.id = "app/api/webhook/route";
exports.ids = ["app/api/webhook/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fwebhook%2Froute&page=%2Fapi%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwebhook%2Froute.ts&appDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fwebhook%2Froute&page=%2Fapi%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwebhook%2Froute.ts&appDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var _workspaces_Princess_Piroutte_Boutique_src_app_api_webhook_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/app/api/webhook/route.ts */ \"(rsc)/./src/app/api/webhook/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/webhook/route\",\n        pathname: \"/api/webhook\",\n        filename: \"route\",\n        bundlePath: \"app/api/webhook/route\"\n    },\n    resolvedPagePath: \"/workspaces/Princess-Piroutte-Boutique/src/app/api/webhook/route.ts\",\n    nextConfigOutput,\n    userland: _workspaces_Princess_Piroutte_Boutique_src_app_api_webhook_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/webhook/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ3ZWJob29rJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ3ZWJob29rJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGd2ViaG9vayUyRnJvdXRlLnRzJmFwcERpcj0lMkZ3b3Jrc3BhY2VzJTJGUHJpbmNlc3MtUGlyb3V0dGUtQm91dGlxdWUlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRndvcmtzcGFjZXMlMkZQcmluY2Vzcy1QaXJvdXR0ZS1Cb3V0aXF1ZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDaUM7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDaUo7O0FBRWpKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJpbmNlc3MtcGlyb3VldHRlLWJvdXRpcXVlLz8wN2M4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi93b3Jrc3BhY2VzL1ByaW5jZXNzLVBpcm91dHRlLUJvdXRpcXVlL3NyYy9hcHAvYXBpL3dlYmhvb2svcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3dlYmhvb2svcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93ZWJob29rXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS93ZWJob29rL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL3dvcmtzcGFjZXMvUHJpbmNlc3MtUGlyb3V0dGUtQm91dGlxdWUvc3JjL2FwcC9hcGkvd2ViaG9vay9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS93ZWJob29rL3JvdXRlXCI7XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fwebhook%2Froute&page=%2Fapi%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwebhook%2Froute.ts&appDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/webhook/route.ts":
/*!**************************************!*\
  !*** ./src/app/api/webhook/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/index.mjs\");\n\n\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY);\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_2__.createClient)(\"https://ohfiglvuvulucoolkchs.supabase.co\", process.env.SUPABASE_SERVICE_ROLE_KEY);\nasync function POST(req) {\n    const body = await req.text();\n    const signature = req.headers.get(\"stripe-signature\");\n    let event;\n    try {\n        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);\n    } catch (error) {\n        console.error(\"Webhook signature error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: \"Webhook failed\"\n        }, {\n            status: 400\n        });\n    }\n    if (event.type === \"checkout.session.completed\") {\n        try {\n            const session = event.data.object;\n            const { error: insertError } = await supabase.from(\"orders\").insert({\n                customer_email: session.customer_email,\n                customer_name: session.customer_details?.name ?? null,\n                shipping_address: session.customer_details?.address ? JSON.stringify(session.customer_details.address) : null,\n                total: session.amount_total ? session.amount_total / 100 : 0,\n                status: \"paid\",\n                stripe_payment_id: session.payment_intent ? String(session.payment_intent) : null\n            });\n            if (insertError) {\n                console.error(\"Supabase insert error:\", insertError);\n                return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                    error: \"Order save failed\"\n                }, {\n                    status: 500\n                });\n            }\n        } catch (err) {\n            console.error(\"Order save error:\", err);\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Order save failed\"\n            }, {\n                status: 500\n            });\n        }\n    }\n    return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n        received: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS93ZWJob29rL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBd0Q7QUFDNUI7QUFDeUI7QUFFckQsTUFBTUcsU0FBUyxJQUFJRiw4Q0FBTUEsQ0FBQ0csUUFBUUMsR0FBRyxDQUFDQyxpQkFBaUI7QUFFdkQsTUFBTUMsV0FBV0wsbUVBQVlBLENBQzNCRSwwQ0FBb0MsRUFDcENBLFFBQVFDLEdBQUcsQ0FBQ0kseUJBQXlCO0FBR2hDLGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtJQUMzQixNQUFNQyxZQUFZSCxJQUFJSSxPQUFPLENBQUNDLEdBQUcsQ0FBQztJQUVsQyxJQUFJQztJQUVKLElBQUk7UUFDRkEsUUFBUWQsT0FBT2UsUUFBUSxDQUFDQyxjQUFjLENBQ3BDUCxNQUNBRSxXQUNBVixRQUFRQyxHQUFHLENBQUNlLHFCQUFxQjtJQUVyQyxFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDRCQUE0QkE7UUFDMUMsT0FBT3JCLGtGQUFZQSxDQUFDdUIsSUFBSSxDQUFDO1lBQUVGLE9BQU87UUFBaUIsR0FBRztZQUFFRyxRQUFRO1FBQUk7SUFDdEU7SUFFQSxJQUFJUCxNQUFNUSxJQUFJLEtBQUssOEJBQThCO1FBQy9DLElBQUk7WUFDRixNQUFNQyxVQUFVVCxNQUFNVSxJQUFJLENBQUNDLE1BQU07WUFFakMsTUFBTSxFQUFFUCxPQUFPUSxXQUFXLEVBQUUsR0FBRyxNQUFNdEIsU0FBU3VCLElBQUksQ0FBQyxVQUFVQyxNQUFNLENBQUM7Z0JBQ3hFQyxnQkFBZ0JOLFFBQVFNLGNBQWM7Z0JBQ3RDQyxlQUFlUCxRQUFRUSxnQkFBZ0IsRUFBRUMsUUFBUTtnQkFDakRDLGtCQUFrQlYsUUFBUVEsZ0JBQWdCLEVBQUVHLFVBQ3hDQyxLQUFLQyxTQUFTLENBQUNiLFFBQVFRLGdCQUFnQixDQUFDRyxPQUFPLElBQy9DO2dCQUNKRyxPQUFPZCxRQUFRZSxZQUFZLEdBQUdmLFFBQVFlLFlBQVksR0FBRyxNQUFNO2dCQUMzRGpCLFFBQVE7Z0JBQ1JrQixtQkFBbUJoQixRQUFRaUIsY0FBYyxHQUNyQ0MsT0FBT2xCLFFBQVFpQixjQUFjLElBQzdCO1lBQ047WUFFTSxJQUFJZCxhQUFhO2dCQUNmUCxRQUFRRCxLQUFLLENBQUMsMEJBQTBCUTtnQkFDeEMsT0FBTzdCLGtGQUFZQSxDQUFDdUIsSUFBSSxDQUFDO29CQUFFRixPQUFPO2dCQUFvQixHQUFHO29CQUFFRyxRQUFRO2dCQUFJO1lBQ3pFO1FBQ0YsRUFBRSxPQUFPcUIsS0FBSztZQUNadkIsUUFBUUQsS0FBSyxDQUFDLHFCQUFxQndCO1lBQ25DLE9BQU83QyxrRkFBWUEsQ0FBQ3VCLElBQUksQ0FBQztnQkFBRUYsT0FBTztZQUFvQixHQUFHO2dCQUFFRyxRQUFRO1lBQUk7UUFDekU7SUFDRjtJQUVBLE9BQU94QixrRkFBWUEsQ0FBQ3VCLElBQUksQ0FBQztRQUFFdUIsVUFBVTtJQUFLO0FBQzVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJpbmNlc3MtcGlyb3VldHRlLWJvdXRpcXVlLy4vc3JjL2FwcC9hcGkvd2ViaG9vay9yb3V0ZS50cz8wZWZjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCBTdHJpcGUgZnJvbSBcInN0cmlwZVwiO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdHJpcGUgPSBuZXcgU3RyaXBlKHByb2Nlc3MuZW52LlNUUklQRV9TRUNSRVRfS0VZISk7XG5cbmNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KFxuICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhLFxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIVxuKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCBib2R5ID0gYXdhaXQgcmVxLnRleHQoKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gcmVxLmhlYWRlcnMuZ2V0KFwic3RyaXBlLXNpZ25hdHVyZVwiKSE7XG5cbiAgbGV0IGV2ZW50O1xuXG4gIHRyeSB7XG4gICAgZXZlbnQgPSBzdHJpcGUud2ViaG9va3MuY29uc3RydWN0RXZlbnQoXG4gICAgICBib2R5LFxuICAgICAgc2lnbmF0dXJlLFxuICAgICAgcHJvY2Vzcy5lbnYuU1RSSVBFX1dFQkhPT0tfU0VDUkVUIVxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIldlYmhvb2sgc2lnbmF0dXJlIGVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiV2ViaG9vayBmYWlsZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgaWYgKGV2ZW50LnR5cGUgPT09IFwiY2hlY2tvdXQuc2Vzc2lvbi5jb21wbGV0ZWRcIikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXNzaW9uID0gZXZlbnQuZGF0YS5vYmplY3QgYXMgU3RyaXBlLkNoZWNrb3V0LlNlc3Npb247XG5cbiAgICAgIGNvbnN0IHsgZXJyb3I6IGluc2VydEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwib3JkZXJzXCIpLmluc2VydCh7XG4gIGN1c3RvbWVyX2VtYWlsOiBzZXNzaW9uLmN1c3RvbWVyX2VtYWlsLFxuICBjdXN0b21lcl9uYW1lOiBzZXNzaW9uLmN1c3RvbWVyX2RldGFpbHM/Lm5hbWUgPz8gbnVsbCxcbiAgc2hpcHBpbmdfYWRkcmVzczogc2Vzc2lvbi5jdXN0b21lcl9kZXRhaWxzPy5hZGRyZXNzXG4gICAgPyBKU09OLnN0cmluZ2lmeShzZXNzaW9uLmN1c3RvbWVyX2RldGFpbHMuYWRkcmVzcylcbiAgICA6IG51bGwsXG4gIHRvdGFsOiBzZXNzaW9uLmFtb3VudF90b3RhbCA/IHNlc3Npb24uYW1vdW50X3RvdGFsIC8gMTAwIDogMCxcbiAgc3RhdHVzOiBcInBhaWRcIixcbiAgc3RyaXBlX3BheW1lbnRfaWQ6IHNlc3Npb24ucGF5bWVudF9pbnRlbnRcbiAgICA/IFN0cmluZyhzZXNzaW9uLnBheW1lbnRfaW50ZW50KVxuICAgIDogbnVsbCxcbn0pO1xuXG4gICAgICBpZiAoaW5zZXJ0RXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlN1cGFiYXNlIGluc2VydCBlcnJvcjpcIiwgaW5zZXJ0RXJyb3IpO1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJPcmRlciBzYXZlIGZhaWxlZFwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiT3JkZXIgc2F2ZSBlcnJvcjpcIiwgZXJyKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk9yZGVyIHNhdmUgZmFpbGVkXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyByZWNlaXZlZDogdHJ1ZSB9KTtcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiU3RyaXBlIiwiY3JlYXRlQ2xpZW50Iiwic3RyaXBlIiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9TRUNSRVRfS0VZIiwic3VwYWJhc2UiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwiUE9TVCIsInJlcSIsImJvZHkiLCJ0ZXh0Iiwic2lnbmF0dXJlIiwiaGVhZGVycyIsImdldCIsImV2ZW50Iiwid2ViaG9va3MiLCJjb25zdHJ1Y3RFdmVudCIsIlNUUklQRV9XRUJIT09LX1NFQ1JFVCIsImVycm9yIiwiY29uc29sZSIsImpzb24iLCJzdGF0dXMiLCJ0eXBlIiwic2Vzc2lvbiIsImRhdGEiLCJvYmplY3QiLCJpbnNlcnRFcnJvciIsImZyb20iLCJpbnNlcnQiLCJjdXN0b21lcl9lbWFpbCIsImN1c3RvbWVyX25hbWUiLCJjdXN0b21lcl9kZXRhaWxzIiwibmFtZSIsInNoaXBwaW5nX2FkZHJlc3MiLCJhZGRyZXNzIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvdGFsIiwiYW1vdW50X3RvdGFsIiwic3RyaXBlX3BheW1lbnRfaWQiLCJwYXltZW50X2ludGVudCIsIlN0cmluZyIsImVyciIsInJlY2VpdmVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/webhook/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/stripe","vendor-chunks/qs","vendor-chunks/object-inspect","vendor-chunks/get-intrinsic","vendor-chunks/side-channel-list","vendor-chunks/side-channel-weakmap","vendor-chunks/has-symbols","vendor-chunks/side-channel-map","vendor-chunks/function-bind","vendor-chunks/side-channel","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/call-bound","vendor-chunks/es-errors","vendor-chunks/es-define-property","vendor-chunks/gopd","vendor-chunks/hasown","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fwebhook%2Froute&page=%2Fapi%2Fwebhook%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fwebhook%2Froute.ts&appDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fworkspaces%2FPrincess-Piroutte-Boutique&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();