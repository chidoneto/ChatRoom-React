## Purpose

This applicaton pretends to be a simple chat application, and it was developed in a couple of days as a coding challenge.

This application has been deployed to Heroku: [https://protected-journey-04810.herokuapp.com/](https://protected-journey-04810.herokuapp.com/) This was mostly done to be able to easily experience it in diverse devices. (There is a very raw solution for mobile, implemented with as few as possible modifications to the original desktop layout.)

## Design Decisions

- Project developed using React.
- Used create-react-app to create the initial framework.
- Decided to go with functional components.
- Most components are stateless. \<Layout\> and \<ChatRoomPanel\> contain the bulk of the application data.
- Other components contain some state data, mostly for form management.
- First solution didn&#39;t use context, but a couple of properties were common in various components, so I created a context to avoid &quot;drilling down&quot; properties through components.
- Implemented property validation with _PropTypes_. There is always the possibility of a broader solution by choosing to go with _TypeScript_.
- Didn&#39;t have a chance to write unit tests, but built a couple of simple ones to make sure the corresponding script was working properly.

## Component Hierarchy

See graphics in document referred at the bottom.

![](RackMultipart20201021-4-126hfur_html_1f954d8542b89e2a.png)

This doc: [https://docs.google.com/document/d/1pYv6SuMnt8JdC-\_Vj01dgbisLpWzalIRvjcjbGlmCko/edit?usp=sharing](https://docs.google.com/document/d/1pYv6SuMnt8JdC-_Vj01dgbisLpWzalIRvjcjbGlmCko/edit?usp=sharing)
