const {Router} = require('express');
const router = Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res)=>{
    res.render('links/add')
});
router.post('/add', isLoggedIn, async (req,res)=>{
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('Success', 'Link Add Successfully');
    res.redirect('/links');
});
router.get('/', isLoggedIn, async(req,res)=>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list.hbs',{links})
});
router.get('/delete/:id', isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('Success', 'Link Delete Successfully');
    res.redirect('/links')
});
router.get('/edit/:id', isLoggedIn, async (req,res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
    res.render('links/edit.hbs', {link: links[0]} );
});
router.post('/edit/:id', isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    const {title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('Success', 'Link Update Successfully');
    res.redirect('/links')
})

module.exports = router;