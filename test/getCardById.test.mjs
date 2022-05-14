import { assert } from 'console';
import request from 'supertest'
import { ServerInitPromise, ServerClosePromise }from '../src/app.mjs'

//Delay allows DB injection to happen before endpoints are hit
const delay = async x => {
    return new Promise(resolve => setTimeout(resolve, 2000, 2 * x))
};

(async function () {
    
    await delay(1)

    describe("GET /api/v1/cards/e1187999-521d-4ed0-8673-6eb8f3c58bb8", function(done) {

        let loadedApp

        before("Loading app data", done => {
            ServerInitPromise.catch(err => done(err)).then(app => loadedApp = app)
            done()
        })

        after("Closing app connections", done => {
            ServerClosePromise.catch(err => done(err))
        })

        it("Testing Sol Ring by id", done => {
     
            request(loadedApp)
                .get("/api/v1/cards/e1187999-521d-4ed0-8673-6eb8f3c58bb8")
                .expect(200)
                .end((err, res) => {
                    if (err) 
                        done(err)
                    else
                        done()                  
                })              
        })
    })

    run()
})()
