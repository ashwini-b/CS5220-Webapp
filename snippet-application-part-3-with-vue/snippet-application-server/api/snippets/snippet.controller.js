const Snippet = require('./snippet.model');

const getSnippets = async (req, res) => {
    const { query } = req;
    const language = query.language;

    let filter = {};
    if (language) {
        filter = {
            programming_language: { $regex: language, $options: 'i' }
        };
    }

    try {
        const snippets = await Snippet.find(filter);
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const getSnippetById = async (req, res) => {
    const { params, query } = req;
    const id = params.id;

    const includeBookmarks = query.bookmarks === 'true';

    try {
        const virtuals = [];

        if (includeBookmarks) {
            virtuals.push('bookmarks');
        }

        const snippet = await Snippet.findOne({ _id: id }).populate(virtuals);

        if (snippet) {
            res.json(snippet);
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const createSnippet = async (req, res) => {
    const { body } = req;

    try {
        // remove created and allow model to apply default
        delete body.created;

        const snippetDoc = new Snippet(body);
        const snippet = await snippetDoc.save();

        res.json(snippet);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const deleteSnippet = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const snippet = await Snippet.findOneAndDelete({ _id: id });

        if (snippet) {
            res.json({ message: 'success', snippet: id });
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = {
    getSnippets,
    getSnippetById,
    createSnippet,
    deleteSnippet
};
