from django.urls import path
from graphene_django.views import GraphQLView
# GraphQLView this view gives us a graphql GUI to work with
# also it will gives us a implementation of graphql feature where we will provide the schema that we created and it will handle all the queries now
from books.schema import schema

urlpatterns = [
    # Only a single URL to access GraphQL
    path("graphql", GraphQLView.as_view(graphiql=True, schema=schema)),
]
