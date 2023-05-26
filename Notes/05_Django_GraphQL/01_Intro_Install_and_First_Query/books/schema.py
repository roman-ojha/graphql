# schema describe our data models which we will provide to our graphQL server

import graphene
from graphene_django import DjangoObjectType
# This "DjangoObjectType" is a way of formatting our django object that can be utilize by our GraphQL
from .models import Books


class BookType(DjangoObjectType):
    # Now here we will just describe the model that we want to use and the data that we want to collect
    # Same as that we do in serializer
    class Meta:
        model = Books
        fields = ("id", "title", "excerpt")
        """
            so, the type that we create above will be translated like this which then GraphQL will create graph qnd that we can query that
            type Books{
                id: id,
                title: String
                Excerpt: String
            }
        """


# Now we need a way to generate a query
class Query(graphene.ObjectType):
    """
    type Query{
        me: User
    }
    """
    # we added the books into query so that we can be able to query all the books on books data
    all_books = graphene.List(BookType)
    # so here we are using 'all_books' which have an access of List of "BookType"
    # now we can use this 'all_books' to query the list of books

    def resolve_all_books(root, info):
        # so here we are resolving the query 'all_books' and we want to perform some specific operation and return the data using this function
        # return Books.objects.all()
        return Books.objects.filter(title="django")


# now we have create the Types and Query out of those type on we will build schema out of it
schema = graphene.Schema(query=Query)
