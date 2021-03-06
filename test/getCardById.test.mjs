import assert  from 'assert';
import request from 'supertest'
import { ServerInitPromise, closeServer } from '../src/app.mjs'

//Delay allows DB injection to happen before endpoints are hit
const delay = async x => {
    return new Promise(resolve => setTimeout(resolve, 2000, 2 * x))
};

(async function () {
    
    await delay(1)
    
    let loadedApp

    before("Loading app data", done => {
        ServerInitPromise.catch(err => done(err)).then(app => loadedApp = app)
        done()
    })

    after("Closing app connections", done => {
        closeServer()
        loadedApp.close()
        done()
    })

    describe("GET /api/v1/cards/{id}", function(done) {

        it("Testing Sol Ring id", done => {
     
            request(loadedApp)
            .get("/api/v1/cards/e1187999-521d-4ed0-8673-6eb8f3c58bb8")
            .expect(200)
            .end((err, res) => {
                if (err) 
                    done(err)
                else
                {
                    assert.equal(res.body._id, 'e1187999-521d-4ed0-8673-6eb8f3c58bb8')
                    assert.equal(res.body.name, 'Sol Ring')
                    done()  
                }                                   
            })              
        })

        it("Testing invalid id", done => {

            request(loadedApp)
            .get("/api/v1/cards/helloandgoodbye")
            .expect(404)
            .end((err, res) => {
                if (err) 
                    done(err)
                else
                    done()  
            })
        })

        it("Testing no id", done => {

            request(loadedApp)
            .get("/api/v1/cards/")
            .expect(404)
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
