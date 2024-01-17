/*
 * @Author: yeyu98
 * @Date: 2024-01-17 22:42:34
 * @LastEditors: yeyu98
 * @LastEditTime: 2024-01-17 23:45:38
 * @Description: 
 */
module.exports = {
    types: [
        { value: 'feat', name: 'feat: A new feature' },
        { value: 'fix', name: 'fix: A bug fix' },
        { value: 'docs', name: 'docs: Documentation only changes' },
        {
          value: 'style',
          name: 'style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
        },
        {
          value: 'refactor',
          name: 'refactor: A code change that neither fixes a bug nor adds a feature',
        },
        {
          value: 'perf',
          name: 'perf: A code change that improves performance',
        },
        { value: 'test', name: 'test: Adding missing tests' },
        {
          value: 'chore',
          name: 'chore: Changes to the build process or auxiliary tools and libraries such as documentation generation',
        },
        { value: 'revert', name: 'revert: Revert to a commit' },
        { value: 'WIP', name: 'WIP: Work in progress' },
      ],
    appendIssueFromBranchName: true,
    allowTicketNumber: false,
    isTicketNumberRequired: true,
    // footerPrefix: 'JTFW-',
    messages: {
        type: 'Select the type of change that you\'re committing:',
        subject: 'Write a short, imperative tense description of the change:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    allowCustomScopes: true,
    skipQuestions: ['scope', 'breaking', 'body', 'footer'], // 想跳过的问题列表
    subjectLimit: 100, // subject主题限制长度
};