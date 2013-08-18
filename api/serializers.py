from rest_framework import serializers, pagination
from fish.models import Payment

class BasePaginatorSerializer(pagination.PaginationSerializer):
    page = serializers.SerializerMethodField('get_current_page')
    limit = serializers.Field(source='paginator.per_page')
    total_pages = serializers.Field(source='paginator.num_pages')

    def get_current_page(self, obj):
        return obj.number


class BaseSerializer(serializers.ModelSerializer):
    id = serializers.Field()

    class Meta:
        exclude = ('modified', )


class PaymentSerializer(BaseSerializer):

    class Meta(BaseSerializer.Meta):
        model = Payment