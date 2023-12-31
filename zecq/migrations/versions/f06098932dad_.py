"""empty message

Revision ID: f06098932dad
Revises: 0204efda3d20
Create Date: 2023-06-24 19:59:51.688970

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f06098932dad'
down_revision = '0204efda3d20'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scenarios', schema=None) as batch_op:
        batch_op.alter_column('inform_channels',
               existing_type=sa.VARCHAR(),
               type_=sa.JSON(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('scenarios', schema=None) as batch_op:
        batch_op.alter_column('inform_channels',
               existing_type=sa.JSON(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    # ### end Alembic commands ###
