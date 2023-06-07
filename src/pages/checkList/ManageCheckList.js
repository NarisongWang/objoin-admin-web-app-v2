import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCheckList,
  updateCheckList,
} from '../../features/checkList/checkListSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import CheckListActions from '../../components/CheckListActions';
import CheckListItem from '../../components/CheckListItem';

const ManageCheckList = () => {
  const { checkList, isLoading, error } = useSelector(
    (state) => state.checkList
  );
  const [checkListState, setCheckListState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheckList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newCheckListState = checkList.map((check) => {
      return {
        index: check.index,
        title: check.title,
        status: check.status,
        note: check.note,
      };
    });
    setCheckListState(newCheckListState);
  }, [checkList]);

  useEffect(() => {
    if (error !== '') {
      toast.error(error);
    }
  }, [error]);

  const handleAdd = (index) => {
    const newCheckListState = [...checkListState];
    newCheckListState.splice(index + 1, 0, {
      index: index + 1,
      title: '',
      status: 0,
      note: '',
    });
    newCheckListState.forEach((item, i) => {
      item.index = i;
    });
    setCheckListState(newCheckListState);
  };

  const handleEdit = (index, title) => {
    const newCheckListState = [...checkListState];
    newCheckListState[index].title = title;
    setCheckListState(newCheckListState);
  };

  const handleDelete = (index) => {
    if (window.confirm('Do you want to delete this item?')) {
      const newCheckListState = [...checkListState];
      newCheckListState.splice(index, 1);
      newCheckListState.forEach((item, i) => {
        item.index = i;
      });
      setCheckListState(newCheckListState);
    }
  };

  const handleUpdate = () => {
    checkListState.forEach((checkItem) => {
      if (checkItem.title === '') {
        toast.warning(`Item NO.${checkItem.index} cannot be empty.`);
        return;
      }
    });
    dispatch(updateCheckList(checkListState))
      .unwrap()
      .then(() => {
        toast.success('Check List has been successfully updated!');
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main>
      {/* Search bar and action buttons */}
      <div className="mb-0 h-[50px] ">
        <div className="fixed top-0 left-0 bg-white w-full h-[160px] border-b"></div>
        <div className="fixed right-4 top-[111px] bg-white">
          <CheckListActions handleUpdate={handleUpdate} />
        </div>
        <div className="mt-16 pb-16">
          {checkListState.map((checkItem, index) => (
            <CheckListItem
              key={index}
              index={checkItem.index}
              title={checkItem.title}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ManageCheckList;
