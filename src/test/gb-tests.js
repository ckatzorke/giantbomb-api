/*jslint node: true,  nomen: true */
/*global describe, it*/

'use strict';
var nock = require('nock');
var apikey = 'test_key';
var should = require('should');
var gb = require('../app/giantbomb.js')(apikey);

//has been simplified for better readability
nock('http://www.giantbomb.com')
    .get('/api/games?api_key=test_key&format=json&filter=name%3ADay%20of%20the%20Tentacle&field_list=api_detail_url%2Cid%2Cname%2Cdeck%2Cimage%2Coriginal_release_date')
    .reply(200, {
        'error': 'OK',
        'limit': 100,
        'offset': 0,
        'number_of_page_results': 1,
        'number_of_total_results': 1,
        'status_code': 1,
        'results': [{
            'api_detail_url': 'http://www.giantbomb.com/api/game/3030-4372/',
            'deck': 'Day of the Tentacle is a point-and-click adventure game that follows Bernard Bernoulli, Laverne, and Hoagie as they try to prevent Purple Tentacle from taking over the world.',
            'id': 4372,
            'image': {
                'icon_url': 'http://static.giantbomb.com/uploads/square_avatar/0/4938/609071-day_of_the_tentacle_box_front_6534x8205.jpg',
                'medium_url': 'http://static.giantbomb.com/uploads/scale_medium/0/4938/609071-day_of_the_tentacle_box_front_6534x8205.jpg'
            },
            'name': 'Maniac Mansion: Day of the Tentacle',
            'original_release_date': '1993-06-25 00:00:00'
        }],
        'version': '1.0'
    }, {
        'content-type': 'application/json; charset=utf-8'
    })
    .get('/api/games?api_key=test_key&format=json&filter=name%3Al%C3%B6mlepl%C3%B6m&field_list=api_detail_url%2Cid%2Cname%2Cdeck%2Cimage%2Coriginal_release_date')
    .reply(200, {
        'error': 'OK',
        'limit': 100,
        'offset': 0,
        'number_of_page_results': 0,
        'number_of_total_results': 0,
        'status_code': 1,
        'results': [],
        'version': '1.0'
    }, {
        'content-type': 'application/json; charset=utf-8'
    })
    .get('/api/game/3030-4372?api_key=test_key&format=json&field_list=id%2Cname%2Caliases%2Cdeck%2Cdescription%2Cimage%2Cimages%2Coriginal_release_date%2Cdevelopers%2Cgenres%2Cpublishers%2Cplatforms%2Csite_detail_url%2Cdate_last_updated')
    .reply(200, {
        'error': 'OK',
        'limit': 1,
        'offset': 0,
        'number_of_page_results': 1,
        'number_of_total_results': 1,
        'status_code': 1,
        'results': {
            'aliases': 'DOTT',
            'date_last_updated': '2014-12-07 14:22:24',
            'deck': 'Day of the Tentacle is a point-and-click adventure game that follows Bernard Bernoulli, Laverne, and Hoagie as they try to prevent Purple Tentacle from taking over the world.',
            'description': 'Simplified',
            'id': 4372,
            'image': {
                'icon_url': 'http://static.giantbomb.com/uploads/square_avatar/0/4938/609071-day_of_the_tentacle_box_front_6534x8205.jpg',
                'medium_url': 'http://static.giantbomb.com/uploads/scale_medium/0/4938/609071-day_of_the_tentacle_box_front_6534x8205.jpg'
            },
            'name': 'Maniac Mansion: Day of the Tentacle',
            'original_release_date': '1993-06-25 00:00:00',
            'platforms': [{
                'api_detail_url': 'http://www.giantbomb.com/api/platform/3045-17/',
                'id': 17,
                'name': 'Mac',
                'site_detail_url': 'http://www.giantbomb.com/mac/3045-17/',
                'abbreviation': 'MAC'
            }, {
                'api_detail_url': 'http://www.giantbomb.com/api/platform/3045-94/',
                'id': 94,
                'name': 'PC',
                'site_detail_url': 'http://www.giantbomb.com/pc/3045-94/',
                'abbreviation': 'PC'
            }],
            'site_detail_url': 'http://www.giantbomb.com/maniac-mansion-day-of-the-tentacle/3030-4372/',
            'images': [{
                'icon_url': 'http://static.giantbomb.com/uploads/square_avatar/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'medium_url': 'http://static.giantbomb.com/uploads/screen_medium/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'screen_url': 'http://static.giantbomb.com/uploads/screen_medium/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'small_url': 'http://static.giantbomb.com/uploads/square_avatar/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'super_url': 'http://static.giantbomb.com/uploads/scale_large/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'thumb_url': 'http://static.giantbomb.com/uploads/scale_small/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'tiny_url': 'http://static.giantbomb.com/uploads/square_mini/8/81005/2552555-17874-maniac-mansion-day-of-the-tentacle-dos-screenshot-references.gif',
                'tags': 'All Images'
            }, {
                'icon_url': 'http://static.giantbomb.com/uploads/square_avatar/8/81005/2552554-387_day+of+the+tentacle.gif',
                'medium_url': 'http://static.giantbomb.com/uploads/screen_medium/8/81005/2552554-387_day+of+the+tentacle.gif',
                'screen_url': 'http://static.giantbomb.com/uploads/screen_medium/8/81005/2552554-387_day+of+the+tentacle.gif',
                'small_url': 'http://static.giantbomb.com/uploads/square_avatar/8/81005/2552554-387_day+of+the+tentacle.gif',
                'super_url': 'http://static.giantbomb.com/uploads/scale_large/8/81005/2552554-387_day+of+the+tentacle.gif',
                'thumb_url': 'http://static.giantbomb.com/uploads/scale_small/8/81005/2552554-387_day+of+the+tentacle.gif',
                'tiny_url': 'http://static.giantbomb.com/uploads/square_mini/8/81005/2552554-387_day+of+the+tentacle.gif',
                'tags': 'All Images'
            }],
            'developers': [{
                'api_detail_url': 'http://www.giantbomb.com/api/company/3010-644/',
                'id': 644,
                'name': 'LucasArts Entertainment Company LLC',
                'site_detail_url': 'http://www.giantbomb.com/lucasarts-entertainment-company-llc/3010-644/'
            }],
            'genres': [{
                'api_detail_url': 'http://www.giantbomb.com/api/genre/3060-4/',
                'id': 4,
                'name': 'Adventure',
                'site_detail_url': 'http://www.giantbomb.com/games/?wikiSlug=adventure&wikiTypeId=3060&wikiId=4&genre=4'
            }],
            'publishers': [{
                'api_detail_url': 'http://www.giantbomb.com/api/publisher/3010-644/',
                'id': 644,
                'name': 'LucasArts Entertainment Company LLC',
                'site_detail_url': 'http://www.giantbomb.com/lucasarts-entertainment-company-llc/3010-644/'
            }]
        },
        'version': '1.0'
    }, {
        'content-type': 'application/json; charset=utf-8'
    })
    .get('/api/game/3030-666666?api_key=test_key&format=json&field_list=id%2Cname%2Caliases%2Cdeck%2Cdescription%2Cimage%2Cimages%2Coriginal_release_date%2Cdevelopers%2Cgenres%2Cpublishers%2Cplatforms%2Csite_detail_url%2Cdate_last_updated')
    .reply(200, {
        'error': 'Object Not Found',
        'limit': 0,
        'offset': 0,
        'number_of_page_results': 0,
        'number_of_total_results': 0,
        'status_code': 101,
        'results': []
    });


describe('Beispiel', function () {
    it('1+1 macht 2 immer und überall', function (done) {
        var i = 1+1;
        ('3').should.be.equal('3').and.be.a.String;
        done();
    });
});
describe('Search for games', function () {
    describe('Search for DOTT', function () {
        it('should return 1 element', function (done) {
            gb.quicksearch('Day of the Tentacle').then(function (result) {
                result.error.should.be.equal('OK');
                result.results.length.should.be.exactly(1);
                result.number_of_page_results.should.be.exactly(1);
                result.results[0].id.should.be.exactly(4372);
                done();
            });
        });
    });
    describe('Search with stupid string', function () {
        it('should return no element', function () {
            gb.quicksearch('lömleplöm').then(function (result) {
                result.error.should.be.equal('OK');
                result.results.length.should.be.exactly(0);
                result.number_of_page_results.should.be.exactly(0);
            });
        });
    });
});

describe('Getting detail for a game', function () {
    describe('Getting detail for 4372 (DOTT)', function () {
        it('should get details for DOTT', function () {
            gb.detail(4372).then(function (detail) {
                detail.error.should.equal('OK');
                detail.results[0].aliases.should.equal('DOTT');
            });
        });
    });
    describe('Getting detail for 666666 (invalid id)', function () {
        it('should get no details', function () {
            gb.detail(666666).then(function (detail) {
                detail.error.should.equal('Object Not Found');
                detail.results.length.should.equals(0);
            });
        });
    });
});
