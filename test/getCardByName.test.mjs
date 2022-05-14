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
        done()
    })

    describe("GET /api/v1/cards/named/{name}", function(done) {

        it("Testing Vandalblast", done => {
     
            request(loadedApp)
            .get("/api/v1/cards/named/Vandalblast")
            .expect(200)
            .end((err, res) => {
                if (err) 
                    done(err)
                else
                {
                    assert.equal(res.body._id, '3636b07e-eab9-4cc8-8624-322c18e8133d')
                    assert.equal(res.body.name, 'Vandalblast')
                    done()  
                }                                   
            })              
        })

        it("Testing invalid name", done => {

            request(loadedApp)
            .get("/api/v1/cards/named/helloandgoodbye")
            .expect(404)
            .end((err, res) => {
                if (err) 
                    done(err)
                else
                    done()  
            })
        })

        it("Testing no name", done => {

            request(loadedApp)
            .get("/api/v1/cards/named")
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
