const catchFunc = (err, res) => {
return res.status(500).json({
        message: err.message,
        stack: err.stack
    });
};

const warning = (arg, res) => { res.json({ warning: arg }) }

const error = (arg, res) => { res.json({ error: arg }) }

const success = (arg, res) => { res.json({ success: arg }) }


const success_WITH_id = (arg, res, id) => {
    res.json({ 
        success: arg,
        id: id
    })
}

export {
    catchFunc,
    warning,
    error,
    success,
    success_WITH_id
}

